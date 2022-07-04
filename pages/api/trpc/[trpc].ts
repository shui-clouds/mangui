import {inferProcedureInput, inferProcedureOutput} from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import {appRouter, AppRouter} from '@/backend/router'

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
})
export type TQuery = keyof AppRouter['_def']['queries']
export type TMutation = keyof AppRouter['_def']['mutations']

export type InferQueryResponse<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>

export type InferMutationOutput<TRouteKey extends TMutation> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>

export type InferMutationInput<TRouteKey extends TMutation> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>
