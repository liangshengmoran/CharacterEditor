import { encode } from 'gpt-tokenizer';

export const TokenCounter = ({ text }: { text: string }) => {
  const tokens = encode(text);
  return <div className='text-end'>token: {tokens.length}</div>;
};