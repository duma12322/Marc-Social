import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import PostCard from "../components/post-card";
import PostInput from "@/components/post-input";
import React from "react";
import { useInView } from "react-intersection-observer";

const Home: NextPage = () => {
  const { ref, inView } = useInView();
  const utils = trpc.useContext();

  const { data, fetchNextPage, isSuccess } = trpc.useInfiniteQuery(
    [
      "post.getInfiniteFeed",
      {
        limit: 5,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  console.log("pages", data?.pages);

  const mutationToggleLike = trpc.useMutation("post.toggleLike", {
    onSuccess() {
      utils.invalidateQueries(["post.getAll"]);
      //   if (!posts) return;
      //   utils.setQueryData(["post.getAll"], (posts) => {
      //     if (!posts) return [];
      //     return posts.map((post) =>
      //       post.id === input.updatedPost?.id
      //         ? { ...post, ...input.updatedPost }
      //         : post
      //     );
      //   });
    },
  });

  const handleToggleLike = async (postId: string) => {
    mutationToggleLike.mutate({ postId: postId });
  };

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // console.log(posts.data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen p-4">
        <PostInput />
        <div className="mb-20" />
        <div className="space-y-5">
          {isSuccess &&
            data.pages.map((page) => (
              <React.Fragment key={page.nextCursor}>
                {page.posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    handleToggleLike={handleToggleLike}
                  />
                ))}
              </React.Fragment>
            ))}
          <div ref={ref} className="w-full h-10 bg-orange-300" />
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Home;
