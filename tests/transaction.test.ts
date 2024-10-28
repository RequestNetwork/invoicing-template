import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getWalletClient,
  getPublicClient,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { mockRainbowKitConfig } from "./mocks/wagmiConfig";

vi.mock("@wagmi/core", () => ({
  getWalletClient: vi.fn(),
  getPublicClient: vi.fn(),
  waitForTransactionReceipt: vi.fn(),
}));

describe("Transaction Processing with Timeout Scenarios", () => {
  const txParams = {
    to: "0x123" as `0x${string}`,
    value: BigInt(0),
    data: "0x" as `0x${string}`,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle slow transaction confirmation", async () => {
    const mockWalletClient = {
      sendTransaction: vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("0x456");
          }, 1000);
        });
      }),
    };

    const mockPublicClient = {
      waitForTransactionReceipt: vi.fn().mockImplementation(({ hash }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              status: "success",
              transactionHash: hash,
            });
          }, 1500);
        });
      }),
    };

    vi.mocked(getWalletClient).mockResolvedValue(mockWalletClient);
    vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

    const walletClient = await getWalletClient(mockRainbowKitConfig);
    const hash = await walletClient?.sendTransaction(txParams);

    expect(hash).toBe("0x456");

    const publicClient = getPublicClient(mockRainbowKitConfig);
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: hash!,
    });

    expect(receipt.status).toBe("success");
    expect(receipt.transactionHash).toBe("0x456");
  });

  it("should handle RPC timeout errors", async () => {
    const mockWalletClient = {
      sendTransaction: vi.fn().mockResolvedValue("0x456"),
    };

    const mockPublicClient = {
      waitForTransactionReceipt: vi
        .fn()
        .mockRejectedValueOnce(new Error("Timeout exceeded"))
        .mockResolvedValueOnce({
          status: "success",
          transactionHash: "0x456",
        }),
    };

    vi.mocked(getWalletClient).mockResolvedValue(mockWalletClient);
    vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

    const walletClient = await getWalletClient(mockRainbowKitConfig);
    const hash = await walletClient?.sendTransaction(txParams);

    expect(hash).toBe("0x456");

    const publicClient = getPublicClient(mockRainbowKitConfig);
    await expect(
      publicClient.waitForTransactionReceipt({ hash: hash! })
    ).rejects.toThrow("Timeout exceeded");

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: hash!,
    });

    expect(receipt.status).toBe("success");
    expect(receipt.transactionHash).toBe("0x456");
  });
});
