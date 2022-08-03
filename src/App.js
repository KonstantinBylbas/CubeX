import { useContext } from "react";
import List from "./components/list/List";
import { ListContext } from "./contexts/listContext";
import "./index.scss";

export default function App() {
  const { contextList, setContextList } = useContext(ListContext);
  if (!contextList) setContextList([{ id: 0, body: "hidden" }]);

  return (
    <div className="App">
      <List array={contextList} />
    </div>
  );
}
