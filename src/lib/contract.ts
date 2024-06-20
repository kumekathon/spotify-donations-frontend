import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    SystemProgram,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';
import { Web3Provider } from '@ethersproject/providers';
import {BN, getProvider} from "@project-serum/anchor";

const donate = async (
    provider: Web3Provider,
    connection: Connection,
    programId: PublicKey,
    statePubkey: PublicKey,
    fromPubkey: PublicKey,
    toPubkey: PublicKey,
    authorityPubkey: PublicKey,
    account_id: string,
    amount: number
) => {
    try {
        const getProvider = () => {
            if ('phantom' in window) {
                // @ts-ignore
                const provider = window.phantom?.solana;

                if (provider?.isPhantom) {
                    return provider;
                }
            }
        const provider = getProvider();
        const userPublicKey = new PublicKey(await provider.getSigner().getAddress());

        const account_id_bytes = new TextEncoder().encode(account_id);
        const amount_bytes = new Uint8Array(new BN(amount).toArray('le', 8));
        const instructionData = Buffer.concat([
            Buffer.from(Uint8Array.of(0)),
            Buffer.from(account_id_bytes),
            Buffer.from(amount_bytes),
        ]);

        const donateIx = new TransactionInstruction({
            keys: [
                { pubkey: statePubkey, isSigner: false, isWritable: true },
                { pubkey: fromPubkey, isSigner: true, isWritable: true },
                { pubkey: toPubkey, isSigner: false, isWritable: true },
                { pubkey: authorityPubkey, isSigner: true, isWritable: false },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId,
            data: instructionData,
        });

        const transaction = new Transaction().add(donateIx);
        transaction.feePayer = userPublicKey;
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

        const signedTransaction = await provider.signAndSendTransaction(transaction);

        const signer = provider.getSigner();
        const signature = await sendAndConfirmTransaction(connection, signedTransaction.serialize(), [signer]);

        console.log('Transaction sent with signature', signature);
    } catch (err) {
        console.error('Transaction failed', err);
    }
};

(async () => {
    // const provider = new Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const programId = new PublicKey('DTNMdyYqzgB7qu53RU6vVyhdERLAWvQKWZHnuAJ2d7k4');
    const statePubkey = new PublicKey('<State Pubkey>');
    const fromPubkey = new PublicKey('<From Pubkey>');
    const toPubkey = new PublicKey('<To Pubkey>');
    const authorityPubkey = new PublicKey('<Authority Pubkey>');
    const account_id = 'example_account_id';
    const amount = 1000;

    await donate(provider, connection, programId, statePubkey, fromPubkey, toPubkey, authorityPubkey, account_id, amount);
})();
