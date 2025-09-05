
import TimeZone from "./TimeZone"; 


function TimeAndCity()  {

  return (
    <>
   <section className="time-zone-container">
      <TimeZone timezone="Asia/Tokyo" city="Tokyo" />
        <TimeZone timezone="Europe/London" city="London" />
        </section>

    </>
  );
};

export default TimeAndCity;


