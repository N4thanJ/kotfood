import CenteredContentBlock from './CenteredContentBlock';
import Hero from './Hero';

export default function Main() {
  return (
    <>
      <Hero />
      <CenteredContentBlock
        content={
          <>
            Zet u, pak een taske koffie, en leun even achterover. Scroll rustig
            verder om uw volgende culinaire avontuur te ontdekken en laat je
            inspireren.
          </>
        }
      />
    </>
  );
}
