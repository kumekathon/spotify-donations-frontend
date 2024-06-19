'use client';
import {Web3ReactProvider, Web3ReactHooks} from '@web3-react/core'
import {Connector} from '@web3-react/types'

import allConnections from '@/connectors'

const connections: [Connector, Web3ReactHooks][] = allConnections.map(([connector, hooks]) => [connector, hooks])


export function PhantomProvider({
                             children,
                           }: Readonly<{
  children: React.ReactNode;
}>) {
  return <Web3ReactProvider connectors={connections}>
    {children}
  </Web3ReactProvider>
}
