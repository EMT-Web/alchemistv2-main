import { sanityClient } from "../../sanity";

export async function getServerSideProps(context:any) {

    const query = `
    *[_type == 'tour'  ]{
        _id,
        _createdAt,
        title,
        price,
        duration,
        slug,
        "destinations": destinations[]->{
          slug,
          city
        },
        mainImage,
      }
    `
    const tours = await sanityClient.fetch(query)
    return {
      props: {
        tours
      },
    };
  }
  