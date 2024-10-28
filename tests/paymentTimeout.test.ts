import { ethers } from "ethers";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";

export async function sendTransactionWithInjectedWallet(timeoutMs = 30000) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  await provider.send("eth_requestAccounts", []);

  const tx = {
    to: "0x370de27fdb7d1ff1e1baa7d11c5820a324cf623c",
    value: ethers.utils.parseEther("0.01"),
    gasLimit: 21000,
  };

  try {
    console.log("Sending transaction...");
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Transaction timeout")), timeoutMs)
    );

    const transactionResponse = (await Promise.race([
      signer.sendTransaction(tx),
      timeoutPromise,
    ])) as ethers.providers.TransactionResponse;

    console.log("Transaction sent. Hash:", transactionResponse.hash);

    const confirmTimeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("Transaction confirmation timeout")),
        timeoutMs
      )
    );

    const receipt = await Promise.race([
      transactionResponse.wait(),
      confirmTimeoutPromise,
    ]);

    console.log("Transaction mined:", receipt);
    return receipt;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  } finally {
    // Clean up any remaining timeout promises
    await vi.runAllTimersAsync();
  }
}

describe("Send real transaction via MetaMask", () => {
  let signer: ethers.providers.JsonRpcSigner;
  let tx: ethers.providers.TransactionRequest;
  const timeoutMs = 30000;

  beforeEach(() => {
    vi.useFakeTimers();
    const ethereum = {
      request: vi.fn(),
      send: vi.fn(),
    };
    global.window = { ethereum } as any;

    tx = {
      to: "0x370de27fdb7d1ff1e1baa7d11c5820a324cf623c",
      value: ethers.utils.parseEther("0.01"),
      gasLimit: 21000,
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should handle transaction timeout", async () => {
    const mockSigner = {
      sendTransaction: vi.fn().mockImplementation(() => new Promise(() => {})),
    };

    vi.spyOn(ethers.providers, "Web3Provider").mockImplementation(
      () =>
        ({
          getSigner: () => mockSigner,
          send: vi.fn().mockResolvedValue([]),
        }) as any
    );

    const promise = sendTransactionWithInjectedWallet(1000);
    await vi.advanceTimersByTimeAsync(1500);
    await expect(promise).rejects.toThrow("Transaction timeout");
  });

  it("should handle confirmation timeout", async () => {
    const mockTransactionResponse = {
      hash: "0x123",
      wait: vi.fn().mockImplementation(() => new Promise(() => {})),
      confirmations: 0,
      from: "0x123",
      nonce: 0,
      gasLimit: ethers.BigNumber.from(21000),
      gasPrice: ethers.BigNumber.from(0),
      data: "",
      value: ethers.BigNumber.from(0),
      chainId: 1,
    } as ethers.providers.TransactionResponse;

    const mockSigner = {
      sendTransaction: vi.fn().mockResolvedValue(mockTransactionResponse),
    };

    vi.spyOn(ethers.providers, "Web3Provider").mockImplementation(
      () =>
        ({
          getSigner: () => mockSigner,
          send: vi.fn().mockResolvedValue([]),
        }) as any
    );

    const promise = sendTransactionWithInjectedWallet(1000);
    await vi.advanceTimersByTimeAsync(1500);
    await expect(promise).rejects.toThrow("Transaction confirmation timeout");
  });

  it("should complete successfully within timeout", async () => {
    const mockTransactionResponse: ethers.providers.TransactionResponse = {
      hash: "0x123",
      wait: vi.fn().mockImplementation(
        () =>
          new Promise<ethers.providers.TransactionReceipt>((resolve) => {
            setTimeout(() => {
              resolve({ status: 1 } as ethers.providers.TransactionReceipt);
            }, 15000);
          })
      ),
      confirmations: 0,
      from: "0x123",
      nonce: 0,
      gasLimit: ethers.BigNumber.from(21000),
      gasPrice: ethers.BigNumber.from(0),
      data: "",
      value: ethers.BigNumber.from(0),
      chainId: 1,
    } as ethers.providers.TransactionResponse;

    const mockSigner = {
      sendTransaction: vi.fn().mockResolvedValue(mockTransactionResponse),
    };

    vi.spyOn(ethers.providers, "Web3Provider").mockImplementation(
      () =>
        ({
          getSigner: () => mockSigner,
          send: vi.fn().mockResolvedValue([]),
        }) as any
    );

    const promise = sendTransactionWithInjectedWallet(30000);
    await vi.advanceTimersByTimeAsync(16000);

    const receipt = (await promise) as ethers.providers.TransactionReceipt;
    expect(receipt).toHaveProperty("status");
    expect(receipt.status).toBe(1);
  });
});
