import URLList from './URLList';
import {NativeEventSource, EventSourcePolyfill} from 'event-source-polyfill';
import Cookies from 'js-cookie';

const getLiveMessages = (
  scheduleId: number,
  onMessage: (message: string) => void
) => {
  const token = Cookies.get('access_token');
  const url = `${URLList.liveURL}${scheduleId}`;

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = new EventSource(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  eventSource.onmessage = function (event) {
    onMessage(event.data);
  };

  eventSource.onerror = function (event) {
    console.error('EventSource failed:', event);
  };

  return eventSource;
};

export default getLiveMessages;
