import { utils } from 'ethers'

import { abi, args, chain, envelope, ethereum } from '../../stubs'
import { ICall } from '../types/ICall'
import { IExtraData } from '../types/IExtraData'
import { ITransaction } from '../types/ITransaction'
import { ProtocolType } from '../types/ProtocolType'

import { formatMethodArgs } from './solidity-formatters'

export function formatMetadata(id?: string, extra?: IExtraData, authToken?: string) {
  if (authToken) {
    extra = { Authorization: authToken, ...extra }
  }
  return envelope.Metadata.create({ id, extra })
}

export function formatEnvelopeArgs(call: ICall, data?: string, privateFrom?: string, privateFor?: string[]) {
  return envelope.Args.create({
    call: formatCall(call),
    private: formatPrivate(privateFrom, privateFor),
    data
  })
}

export function formatCall(call: ICall) {
  return args.Call.create({
    contract: formatContract(call.contractName, call.contractTag),
    method: formatMethod(call.methodSignature),
    args: formatMethodArgs(call.methodSignature, call.args)
  })
}

export function formatContract(name?: string, tag?: string) {
  return abi.Contract.create({ id: formatContractId(name, tag) })
}

function formatContractId(name?: string, tag?: string) {
  return abi.ContractId.create({ name, tag })
}

export function formatMethod(signature?: string) {
  return abi.Method.create({ signature })
}

export function formatPrivate(privateFrom?: string, privateFor?: string[]) {
  return privateFrom && privateFor && privateFor.length !== 0
    ? args.Private.create({ privateFrom, privateFor })
    : undefined
}

export function formatProtocol(type?: ProtocolType) {
  let protocolType: chain.ProtocolType = chain.ProtocolType.ETHEREUM_CONSTANTINOPLE

  switch (type) {
    case ProtocolType.BesuOrion:
      protocolType = chain.ProtocolType.BESU_ORION
      break
    case ProtocolType.QuorumConstellation:
      protocolType = chain.ProtocolType.QUORUM_CONSTELLATION
      break
    case ProtocolType.QuorumTessera:
      protocolType = chain.ProtocolType.QUORUM_TESSERA
      break
    default:
      protocolType = chain.ProtocolType.ETHEREUM_CONSTANTINOPLE
      break
  }

  return chain.Protocol.create({ type: protocolType })
}

export function formatAccount(address?: string) {
  if (!address) {
    return
  }

  return utils.getAddress(address)
}

export function formatChain(chainUUID?: string, chainName?: string) {
  if (!chainUUID && !chainName) {
    throw new Error('Either chainUUID or chainName must be specified')
  }

  return chain.Chain.create({ uuid: chainUUID, name: chainName })
}

export function formatTransaction(tx: ITransaction) {
  return ethereum.Transaction.create({ txData: formatTxData(tx) })
}

export function formatTxData(tx: ITransaction) {
  return ethereum.TxData.create({
    data: tx.data,
    gas: tx.gas,
    gasPrice: tx.gasPrice,
    nonce: tx.nonce,
    to: formatAccount(tx.to),
    value: tx.value
  })
}