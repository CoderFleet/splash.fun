const MintActivities = () => {
  const activities = [
    {
      time: "2024-01-01 12:00:00",
      type: "MINT",
      hash: "0x123456...cdef",
      amount: "1,000,000,000",
      token: "SPLASH"
    },
    {
      time: "2024-01-01 12:01:00",
      type: "TXN",
      hash: "0xabcdef...7890",
      status: "Confirmed"
    },
    {
      time: "2024-01-01 12:02:00",
      type: "TXN",
      hash: "0x987654...fedcba",
      status: "Confirmed"
    },
    {
      time: "2024-01-01 12:03:00",
      type: "MINT",
      hash: "0xfedcba...4321",
      amount: "1,000,000,000",
      token: "SPLASH"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl font-semibold">Mint Activities:</h2>
      
      <div className="bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
        <div className="font-mono text-xs space-y-1">
          {activities.map((activity, index) => (
            <div key={index} className="text-gray-300 leading-relaxed">
              <span className="text-gray-500">[{activity.time}]</span>{' '}
              <span className={`font-semibold ${
                activity.type === 'MINT' ? 'text-green-400' : 'text-cyan-400'
              }`}>
                {activity.type}
              </span>{' '}
              <span className="text-gray-400">::</span>{' '}
              <span className="text-blue-400">{activity.hash}</span>
              {activity.amount && (
                <>
                  {' :: '}
                  <span className="text-yellow-400">{activity.amount}</span>
                  {' '}
                  <span className="text-green-400">{activity.token}</span>
                </>
              )}
              {activity.status && (
                <>
                  {' :: '}
                  <span className="text-green-400">{activity.status}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MintActivities;