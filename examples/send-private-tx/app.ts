// tslint:disable: no-console

import { Producer, ProtocolType } from '../../src'

export const start = async () => {
  try {
    const producer = new Producer(['localhost:9092'])
    await producer.connect()

    // Deploy a new SimpleToken contract
    // const envelopeId = await producer.sendTransaction({
    //   chain: 'besu',
    //   contractName: 'SimpleToken',
    //   methodSignature: 'constructor()',
    //   from: '0x7e654d251da770a068413677967f6d3ea2fea9e4', // Default Orchestrate account in development mode
    //   protocol: ProtocolType.BesuOrion,
    //   privateFor: ['A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo='],
    //   privateFrom: 'Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs='
    // })

    const envelopeId = await producer.sendTransaction({
      chain: 'quorum',
      contractName: 'SimpleToken',
      methodSignature: 'constructor()',
      from: '0x7e654d251da770a068413677967f6d3ea2fea9e4', // Default Orchestrate account in development mode
      protocol: ProtocolType.QuorumTessera,
      privateFor: ['QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc='],
      privateFrom: 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo='
    })

    console.log(`Envelope ID: ${envelopeId}`)
  } catch (error) {
    console.error(error)
  }
}
