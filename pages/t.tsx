import { trpc } from "@/utils/trpc"
import { InferGetServerSidePropsType } from "next"
import type React from "react"
import { inferQueryResponse } from "./api/trpc/[trpc]"
import TenantCard from '@/components/tenants/Card'
import { createGetInitialProps } from '@mantine/next'
const getInitialProps = createGetInitialProps()


export default function Home2() {

  const {
    data: currentTenants,
    refetch,
    isLoading,
  } = trpc.useQuery(['get-tenants'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })


  if (isLoading) return 'LODING WAAAA'

  return (
    <>
      {currentTenants?.length && currentTenants.map((tenant) => (
        <TenantCard tenant={tenant} key={tenant.id} />
      ))}
    </>
  )

}