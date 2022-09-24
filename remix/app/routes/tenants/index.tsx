import { ActionArgs, ActionFunction, DataFunctionArgs, json, LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useActionData, useLoaderData, Form } from "@remix-run/react";
import { createTenant, getTenants } from "@/lib/db";

export const loader = async () => json({ tenants: await getTenants() })

export default function Tenants() {
  const { tenants } = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Tenants
      </h1>
      {tenants.map((tenant) => (
        
          <Link
            to={`/tenants/${tenant.id}`}
            className="text-xl text-blue-600 underline"
          >
          {tenant.name}
          </Link>
      ))}
      
    </main>
  );
}