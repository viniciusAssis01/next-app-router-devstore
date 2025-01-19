import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
	/*
	Variáveis ​​de ambiente no lado do servidor, não disponíveis no cliente.
  Jogará se você acessar essas variáveis ​​no cliente.
*/
	server: {
		APP_URL: z.string().url(),
	},

	/*
	Variáveis ​​de ambiente disponíveis no cliente (e servidor).
	Você receberá erros de tipo se não forem prefixados com o next_public_.
	*/
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
	},

	/*Devido à maneira como o next.js agrupa variáveis ​​de ambiente no limite e no cliente,Precisamos destruí-los manualmente para garantir que todos estejam incluídos no pacote.
	
	Você receberá erros de tipo, se todas as variáveis ​​do `Server` &` Client` não estiverem incluídas aqui.*/
	//dentro de runtimeEnv temos q repetir o nome das variavies e usar o process.env.NomeDaVariavel para preeche-las com o valor da variavel ambiente (do arq .env)
	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
});

/* const envSchema = z.object({
	NEXT_PUBLIC_API_BASE_URL: z.string().url(),
	APP_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		"invalid environment variables",
		parsedEnv.error.flatten().fieldErrors
	);

	throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data; */
