import React from 'react'
import whitelistAddresses from '../assets/smart-contract/whitelist.json'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

export function contains(address) {
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    const rootHash = '0x' + merkleTree.getRoot().toString('hex')

    const getProofForAddress = merkleTree.getHexProof(keccak256(address))

    return merkleTree.verify(getProofForAddress, keccak256(address), rootHash)
}

export function getProofForAddress(address) {
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

    return merkleTree.getHexProof(keccak256(address))
}
