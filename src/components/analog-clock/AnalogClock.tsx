import { Component } from "react";
import "./clock.css";

type ClockProps = {
  timezone: string; 
};

type ClockState = {
  time: Date;
};

export default class Clock extends Component<ClockProps, ClockState> {
  private timerId?: ReturnType<typeof setInterval>;

  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: this.getTimeInZone(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        time: this.getTimeInZone(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  getTimeInZone(): Date {
    const { timezone } = this.props;
    const now = new Date();

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const second = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);

    const zonedDate = new Date();
    zonedDate.setHours(hour, minute, second, 0);
    return zonedDate;
  }

  render() {
    const { time } = this.state;

    return (
      <div className="clock">
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`,
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${time.getMinutes() * 6}deg)`,
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${time.getSeconds() * 6}deg)`,
          }}
        />
  
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>
    );
  }
}
