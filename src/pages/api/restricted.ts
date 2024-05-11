// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session) {
    res.send({
      content:
        "Este es contenido protegido. Puedes acceder a este contenido porque estás registrado.n"
    });
  } else {
    res.send({
      error:
        "Debe iniciar sesión para ver el contenido protegido en esta página."
    });
  }
};

export default restricted;
