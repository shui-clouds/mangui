import { ActionArgs, json, redirect } from '@remix-run/node'
import { createTenant } from '@/lib/db'
import { Form, useActionData } from '@remix-run/react'

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData()

  const name = formData.get('name')
  const email = formData.get('email')

  const tenant = await createTenant({ name, email })
  return redirect(`/tenants/${tenant.id}`)
}

export default function NewTenant() {
  const actionData = useActionData<typeof action>()
  return (
    <><Form method='post' action='/tenants/new'>
      <p>
        <label>
          Name:
          <input name='name' type='text' />
        </label>
      </p>
      <p>
        <label>
          Email:
          <input name='email' type='text' />
        </label>
      </p>
      <p>
        <button type='submit'>Create</button>
      </p>
    </Form>
    </>
  )
}
