import React, { useContext } from 'react';
import GeneralSongItem from './GeneralSongItem';
import { PlayerSourceContext } from '../store/PlayerSourceContext';

const GeneralSongsList = props => {
  const [playerSource] = useContext(PlayerSourceContext);
  console.log(props.images);
  return (
    <div className='table_container'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th width='85%'>Name</th>
            <th width='10%'>Duration</th>
          </tr>
        </thead>
        <tbody>
          {props.songs.map((item, index) => (
            <GeneralSongItem
              key={item.id}
              item={item}
              i={index}
              active={item.id === playerSource.id}
              images={props.images}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>{/* <td>Sum</td>
                <td>$180</td> */}</tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GeneralSongsList;
