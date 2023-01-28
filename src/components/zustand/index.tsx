import { useEffect } from 'react';
import { useUser } from '../../zustand';


const Child = () => {
  const { data } = useUser();

  return (
    <p>Child: {data?.id}</p>
  );
};

const Zustand = () => {
    const { data, mutate } = useUser();
    const handleClick = () => {
        mutate();
        mutate();
        mutate();
    };

    // useEffect(() => {
    //   console.log(data);
    // }, [data]);

    return (
        <div>
            <h1>Zustand</h1>
            <button onClick={handleClick}>Button</button>
            <p>App: {data?.id}</p>
            <Child />
        </div>
    );
};

export default Zustand;
