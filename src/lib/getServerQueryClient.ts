import { cache } from "react";

import { makeQueryClient } from "./makeQueryClient";

export const getServerQueryClient = cache(makeQueryClient);
