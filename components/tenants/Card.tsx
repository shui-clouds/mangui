import React from "react"
import { inferQueryResponse } from '../../pages/api/trpc/[trpc]'

type Tenant = inferQueryResponse<'get-tenants'>[number]

export default function TenantCard({ tenant }: { tenant: Tenant }) {
    return (
        <div className="p-4 m-2 max-w-sm bg-white rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-2xl m-2 font-semibold text-black">{tenant.first_name}</h5>
            <p className="text-2xl m-2 font-semibold text-black">£{tenant.last_name}</p>
            <p className="text-2xl m-2 font-semibold text-black">£{tenant.balance}</p>
            {tenant.email && <p className="text-2xl m-2 font-semibold text-green-600">£{tenant.email}</p>}
            <div className="flex">
                <button className="mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                    View
                </button>
            </div>
        </div>
    )
}
