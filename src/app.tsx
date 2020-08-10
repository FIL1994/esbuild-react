import * as React from "react";

export function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div
      onClick={() => {
        setCount((count) => ++count);
      }}
    >
      Home! {count}
    </div>
  );
}
