import { json, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getTenant } from "@/lib/db";

export const loader = async (args: LoaderArgs) => {
    if (!args.params.tenantId) throw new Error("Tenant ID is required")
    const tenant = await getTenant(args.params.tenantId)
    
    return json({tenant})
}

export default function Tenant() {
  const { tenant } = useLoaderData<typeof loader>()
  const tenantData = JSON.stringify(tenant)
  return (
    <>
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {tenant.name}
      </h1>
      <p>{tenantData}</p>
    </>
  )
}