"use client";
import { MintActivity } from "./types";

export default function ActivityItem({ activity }: { activity: MintActivity }) {
  const getColor = () => {
    switch (activity.type) {
      case "MINT":
        return "text-green-400";
      case "TXN":
        return "text-cyan-400";
      case "INFO":
        return "text-gray-400";
      case "ERROR":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  return (
    // <div className="text-gray-300 leading-relaxed font-mono text-xs">
    //   <span className="text-gray-500">[{activity.time}]</span>{" "}
    //   <span className={`font-semibold ${getColor()}`}>{activity.type}</span>{" "}
    //   <span className="text-gray-400">::</span>{" "}
    //   {activity.message && (
    //     <span className="text-gray-300 overflow-hidden">{activity.message}</span>
    //   )}

    //   {activity.hash && (
    //     <>
    //       <span className="text-blue-400 overflow-hidden">{activity.hash}</span>
    //     </>
    //   )}

    //   {activity.amount && activity.token && (
    //     <>
    //       {" :: "}
    //       <span className="text-yellow-400">{activity.amount}</span>{" "}
    //       <span className="text-green-400">{activity.token}</span>
    //     </>
    //   )}

    //   {activity.status && (
    //     <>
    //       {" :: "}
    //       <span
    //         className={
    //           activity.type === "ERROR"
    //             ? "text-red-400"
    //             : "text-green-400"
    //         }
    //       >
    //         {activity.status}
    //       </span>
    //     </>
    //   )}
    // </div>
    <div className="font-mono text-xs text-gray-300 whitespace-nowrap overflow-x-auto no-scrollbar flex gap-2">
      <span className="text-gray-500">[{activity.time}]</span>{" "}
      <span className={`font-semibold ${getColor()}`}>{activity.type}</span>{" "}
      <span className="text-gray-400">::</span>{" "}
      {activity.message && (
        <span className="text-gray-300 truncate overflow-hidden whitespace-nowrap max-w-full block">
          {activity.message}
        </span>
      )}
      {activity.hash && (
        <span className="text-blue-400 truncate overflow-hidden whitespace-nowrap max-w-full block">
          {activity.hash}
        </span>
      )}
      {activity.amount && activity.token && (
        <>
          {" :: "}
          <span className="text-yellow-400">{activity.amount}</span>{" "}
          <span className="text-green-400">{activity.token}</span>
        </>
      )}
      {activity.status && (
        <>
          {" :: "}
          <span
            className={
              activity.type === "ERROR" ? "text-red-400" : "text-green-400"
            }>
            {activity.status}
          </span>
        </>
      )}
    </div>
  );
}
