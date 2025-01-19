import React, { useEffect, useState, useRef } from "react";
import { api } from "../api";
import MeetingBox from "../components/MeetingBox";

async function fetchAllMeetings() {
  const allMeetings = []; // Store all records
  let records = await api.meeting.findMany();
  allMeetings.push(...records);
  return allMeetings;
}

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      console.log('hi');
      hasLogged.current = true;
    }

    const loadMeetings = async () => {
      try {
        const data = await fetchAllMeetings();
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading meetings...</div>;
  }

  return (
    <div>
      <ul>
        {meetings.map((meeting) => (
          <MeetingBox key={meeting.id} meeting={meeting} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MeetingsPage);
