/* eslint-disable react/prop-types */
import { useState } from "react";
import { EditTask } from "../components/EditTask";
import { TaskDetail } from "../components/TaskDetail";
import { TaskList } from "../components/TaskList";

export const HomePage = () => {
  const [rightBlockState, setRightBlockState] = useState({id: null, type: null});

  return (
    <>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <TaskList setRightBlockState={setRightBlockState} />
        </div>
        {rightBlockState.id && <RightBlock id={rightBlockState.id} type={rightBlockState.type } setRightBlockState={setRightBlockState} />}
      </div>
    </>
  )
};

const RightBlock = ({ id, type, setRightBlockState }) => {
  return (
    <div style={{flex: 1, borderLeft: '1px solid black'}}>
      {type === "edit" && <EditTask taskId={id} onSubmit={() => setRightBlockState({id: null, type: null})} />}
      {type === "detail" && <TaskDetail taskId={id} onClose={() => setRightBlockState({id: null, type: null})} />}
    </div>
  );
};
