import { ActionArgs, ActionFunction, DataFunctionArgs, json, LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { createTenant, getTenants } from "@/lib/db";

export const loader = async () => json({ tenants: await getTenants() })

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData()
  const [tenant, errors] = await createTenant(formData);
  if (errors) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }
  return redirect(`/tenants/${tenant.id}`);
}

export default function Tenants() {
  const { tenants } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
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
      <form method="post">
        <p>
         <label>
          Name:
          <input
            name="name"
            type="text"
          />
        </label>
        </p>
        <p>
        <label>
          Email:
          <input
            name="email"
            type="text"
          />
        </label>
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
    </form>
    </main>
  );
}