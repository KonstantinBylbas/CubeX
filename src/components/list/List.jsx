import { useContext } from "react";
import { ListContext } from "../../contexts/listContext";
import Button from "../button/Button";
import "./List.scss";

export default function List({ array }) {
  const { contextList, setContextList } = useContext(ListContext);

  let tmp;
  function arrayIterration(id, arr) {
    arr.map((elem) =>
      Array.isArray(elem)
        ? arrayIterration(id, elem)
        : elem.id === id
        ? (tmp = arr)
        : ""
    );
  }

  function update() {
    localStorage.setItem("list", JSON.stringify(contextList));
    setContextList([...contextList]);
  }

  function deleteElem(id) {
    arrayIterration(id, contextList);
    tmp.splice(tmp.indexOf(tmp.find((elem) => elem.id === id)), 1);
    update();
  }

  function addElem(target, type = "") {
    arrayIterration(array[array.length - 1].id, contextList);

    let lastElem = tmp.find((elem) => elem.id === array[array.length - 1].id);
    let currPos = tmp.indexOf(lastElem);
    let value;
    let newID = handlerNewID();

    if (type === "") {
      value = target.previousElementSibling.value;
      if (lastElem.body === "hidden" && value !== "") tmp.splice(currPos, 1);
      target.previousElementSibling.value = "";
    } else if (lastElem.body === "hidden") tmp.splice(currPos, 1);

    tmp.splice(
      currPos + 1,
      0,
      type === "" ? { id: newID, body: value } : [{ id: newID, body: "hidden" }]
    );
    tmp.splice(currPos + 2, 0, { id: newID + 1, body: "hidden" });

    update();
  }

  function handlerNewID() {
    return (
      Math.max.apply(
        Math,
        contextList.flat(1000).map((elem) => elem.id)
      ) + 1
    );
  }

  function moveElem(id, type) {
    arrayIterration(id, contextList);
    let currElem = tmp.find((elem) => elem.id === id);
    let currPos = tmp.indexOf(currElem);
    if (type === "up") type = -1;
    else type = +1;
    tmp.splice(currPos, 1);
    tmp.splice(currPos + type, 0, currElem);
    update();
  }

  return (
    <ul className="list">
      <li className="row">
        <input type="text" />
        <Button
          text="add"
          type="add"
          handlerClick={({ target }) => addElem(target)}
        />
        <Button
          text="add sublist"
          type="addSublist"
          handlerClick={({ target }) => addElem("", "sublist")}
        />
        <Button text="remove sublist" type="removeSublist" />
      </li>
      {array && array.length
        ? array.map((subElem, i = 0) =>
            Array.isArray(subElem) ? (
              <List array={subElem} />
            ) : (
              <li
                key={subElem.id}
                className={subElem.body === "hidden" ? "hidden" : ""}
              >
                {subElem.body}
                {
                  <div className="row">
                    <Button
                      text="remove"
                      handlerClick={() => deleteElem(subElem.id)}
                    />
                    {i !== 0 ? (
                      <Button
                        text="up"
                        handlerClick={() => moveElem(subElem.id, "up")}
                      />
                    ) : (
                      ""
                    )}
                    {i + 2 !== array.length ? (
                      <Button
                        text="down"
                        handlerClick={() => moveElem(subElem.id, "down")}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                }
              </li>
            )
          )
        : ""}
    </ul>
  );
}
