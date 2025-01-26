import { MessagesResource } from '@/i18n/resources';

const Home = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {MessagesResource.WELCOME_MESSAGE}
      </h2>
      <p className="text-muted-foreground">
        {MessagesResource.SELECT_AN_OPTION}
      </p>
    </>
  );
};

export default Home;
