import { sendRedirect, setCookie } from "vinxi/server";
import { generateState } from "arctic";
import { github } from "~/lib/auth";

import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	setCookie(event.nativeEvent, "github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});
	return sendRedirect(event.nativeEvent, url.toString());
}