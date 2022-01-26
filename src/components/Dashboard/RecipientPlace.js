import React from 'react';
import { useFolder } from '../../contexts/ShopContext'
import { useParams } from 'react-router-dom'
import Recipient from './Recipient'

const RecipientPlace = () => {
    const { folderId } = useParams()
    const { recipients } = useFolder(folderId)
    console.log(recipients)

  return <div>
      {recipients.length > 0 && (
        <div className="d-flex flex-wrap">
          {recipients.map((child) => (
            <div
              key={child.id}
              style={{ maxWidth: "250px" }}
              className="p-2"
            >
              <Recipient recipient={child}></Recipient>
            </div>
          ))}
        </div>
      )}
  </div>;
};

export default RecipientPlace;
