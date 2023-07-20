import MeetupList from "../../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head
 from "next/head";
function HomePage(props) {

  return <><Head><title>react Meetups</title></Head><MeetupList meetups={props.meetups} />;</>
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: dummy_meetups,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://labfaresi:Yarrak1.@try-out.zzgyhjx.mongodb.net/test"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
