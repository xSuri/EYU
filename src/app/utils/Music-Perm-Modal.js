import { useState } from 'react';
import { usePermission } from '../PermissionContext';

export default function MusicPermission() {
  const [modalVisible, setModalVisible] = useState(true);
  const { setPerms } = usePermission();

  const handlePermission = (status) => {
    setPerms(status);
    setModalVisible(false);
  };

return (
  <div
    className="relative min-h-screen flex items-center justify-center"
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#1a1a1a',
    }}
  >
    {modalVisible && (
      <div className="absolute z-50 bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Enable Background Music
        </h2>
        <p className="text-gray-300 mb-6">
          To enable music, click the button below. This action is required by your browser.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handlePermission(true)}
            style={{ cursor: 'pointer' }}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-md transform hover:scale-105"
          >
            Enable Music
          </button>
          <button
            onClick={() => handlePermission(false)}
            style={{ cursor: 'pointer' }}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-md transform hover:scale-105"
          >
            Disable Music
          </button>
        </div>
      </div>
    )}
  </div>
);
}