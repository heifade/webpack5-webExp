import React, { useState } from "react";
import { Button } from "antd";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import styles from "./styles.less";

function App() {
  const [count, setCount] = useState<number>(0);

  const onAdd = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.divForm}>
      <div>count: {count}</div>
      <Button type="primary" onClick={onAdd}>
        加1
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
