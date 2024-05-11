import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

interface PostsSortPanelProps {
  pathname: string;
}

const PostsSortPanel = ({ pathname }: PostsSortPanelProps) => {
  const router = useRouter();

  const handleSortChange = (sort: string, time: string) => {
    // Actualizar la ruta con los parámetros de clasificación seleccionados
    router.push({
      pathname,
      query: { sort, time }
    });
  };

  const sort = router.query.sort as string | undefined;
  const time = router.query.time as string | undefined;

  return (
    <div className="flex">
      <ul className="flex">
        <li>
          <Link
            href={{
              pathname
            }}
            shallow
            replace
          >
            <button
              type="button"
              className={clsx(
                "text-md lg:text-lg p-2 lg:p-3 block",
                !sort && "font-bold"
              )}
              onClick={() => handleSortChange("latest", "all")}
            >
              Ultimo
            </button>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname,
              query: { sort: "top", time: "all" }
            }}
            shallow
            replace
          >
            <button
              type="button"
              className={clsx(
                "text-md lg:text-lg p-2 lg:p-3 block",
                sort === "top" && "font-bold"
              )}
              onClick={() => handleSortChange("top", "all")}
            >
              Principales
            </button>
          </Link>
        </li>
      </ul>
      {sort === "top" && (
        <ul className="ml-auto flex">
          <Link
            href={{
              pathname,
              query: { sort: "top", time: "all" }
            }}
            shallow
            replace
          >
            <button
              type="button"
              className={clsx(
                "text-md lg:text-lg p-2 lg:p-3 block",
                time === "all" && "font-bold"
              )}
              onClick={() => handleSortChange("top", "all")}
            >
              Todo el tiempo
            </button>
          </Link>
          <Link
            href={{
              pathname,
              query: { sort: "top", time: "day" }
            }}
            shallow
            replace
          >
            <button
              type="button"
              className={clsx(
                "text-md lg:text-lg p-2 lg:p-3 block",
                time === "day" && "font-bold"
              )}
              onClick={() => handleSortChange("top", "day")}
            >
              Dia
            </button>
          </Link>
          <Link
            href={{
              pathname,
              query: { sort: "top", time: "week" }
            }}
            shallow
            replace
          >
            <button
              type="button"
              className={clsx(
                "text-md lg:text-lg p-2 lg:p-3 block",
                time === "week" && "font-bold"
              )}
              onClick={() => handleSortChange("top", "week")}
            >
              Semana
            </button>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default PostsSortPanel;
