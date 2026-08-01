import { get_encoding } from "tiktoken";

const getEncoderForGpt2 = get_encoding("gpt2");

const encode = getEncoderForGpt2.encode("hello i am vivek");

console.log(encode);

const decode = getEncoderForGpt2.decode(encode);

console.log(decode);
console.log(new TextDecoder().decode(decode));
