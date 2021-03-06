import React from "react";
import Link from "next/link";
import api from "../product/api";
import { Products } from "../product/types";
import { Stack, Box, Image, Text, Grid, Spinner } from "@chakra-ui/react";
import Home from "./home";
import FailurePage from "./failure";

interface Props {
  results: Products[];
}

const IndexPage: React.FC<Props> = ({ results }) => {
  if (results) {
    if (results[0].error) return <FailurePage message={results[0].error} />;
    return (
      <Box padding={4}>
        <Grid
          width="100%"
          backgroundColor="white"
          padding={4}
          borderRadius={2}
          boxShadow="sm"
          templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
        >
          {results.map((movie) => (
            <Link key={movie.id} href={`/${movie.id}`}>
              <a>
                <Stack direction="row" padding={4}>
                  <Image
                    src={movie.image}
                    backgroundColor="gray.50"
                    borderRadius="sm"
                    width={250}
                    height={360}
                    minWidth={250}
                    minHeight={360}
                  />
                  <Stack>
                    <Text fontSize="2xl" fontWeight={500}>
                      {movie.title}
                    </Text>
                    <Text fontSize="2xl" fontWeight={500}>
                      $ {movie.year} ARS
                    </Text>
                  </Stack>
                </Stack>
              </a>
            </Link>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return <Home/>;
  }
};

export const getServerSideProps = async ({ query }) => {
  if (!query.q) {
    return {
      props: {},
    };
  }
  const results = await api.search(query.q as string);
  return {
    props: {
      results,
    },
  };
};

export default IndexPage;
