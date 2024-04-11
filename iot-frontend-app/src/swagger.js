import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const params = new URLSearchParams(window.location.search);
if (params.has('username') && params.has('token')) {
    const token = params.get('token');
    const username = params.get('username');

    // Функция для отправки GET-запроса на сервер для получения данных значения сенсора
    function fetchSensorValuesFromServer(sensorId, startDate, endDate) {
        // Форматируем даты в ISO 8601
        const isoStartDate = new Date(startDate).toISOString();
        const isoEndDate = new Date(endDate).toISOString();
        axios.get(`http://localhost:3000/sensor/${sensorId}/sensor-values`, {
            params: {
                startDate: isoStartDate,
                endDate: isoEndDate
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const sensorValues = response.data;
            const dataBlock = document.querySelector('.DataBlock');
            dataBlock.innerHTML = ''; // Очищаем содержимое блока перед добавлением новых данных
            // Создаем таблицу для вывода данных
            const table = document.createElement('table');
            table.classList.add('sensor-table');
            // Создаем заголовок таблицы
            const headerRow = document.createElement('tr');
            const valueHeader = document.createElement('th');
            const timestampHeader = document.createElement('th');
            valueHeader.textContent = 'Значение';
            timestampHeader.textContent = 'Дата и время';
            headerRow.appendChild(valueHeader);
            headerRow.appendChild(timestampHeader);
            table.appendChild(headerRow);
            // Заполняем таблицу данными
            sensorValues.forEach(value => {
                const { value: sensorValue, timestamp } = value;
                const formattedTimestamp = new Date(timestamp).toLocaleString();
                const row = document.createElement('tr');
                const valueCell = document.createElement('td');
                const timestampCell = document.createElement('td');
                valueCell.textContent = sensorValue.toFixed(1); // Округляем до одной цифры после запятой
                timestampCell.textContent = formattedTimestamp;
                row.appendChild(valueCell);
                row.appendChild(timestampCell);
                table.appendChild(row);
            });
            // Добавляем таблицу на страницу
            dataBlock.appendChild(table);
            // Показываем блок DataBlock
            dataBlock.style.display = 'block';
        })
        .catch(error => {
            // Обработка ошибок
            console.error('Error fetching sensor values:', error);
        });
    }
    function handleButtonClick(deviceId) {
        // Создаем запрос к Swagger API для получения данных сенсоров
        axios.get(`http://localhost:3000/devices/${deviceId}/sensors`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const sensorData = response.data;
            const sensorBlock = document.querySelector('.SensorBlock');
            sensorBlock.innerHTML = ''; // Очищаем содержимое блока перед добавлением новых данных
            sensorData.forEach(sensor => {
                const { id, name, comment } = sensor;
                const sensorElement = document.createElement('div');
                sensorElement.innerHTML = `
                    <p>Сенсоры</p>
                    <button class="sensor-button" data-sensor-id="${id}">${name}</button>
                    <button class="edit-button">Редактировать</button>
                    <p class="sensor-comment">${comment}</p>
                `;
                sensorElement.classList.add('sensor-item');
                sensorBlock.appendChild(sensorElement);

                // Обработчик события нажатия кнопки
                sensorElement.querySelector('.sensor-button').addEventListener('click', () => {
                    const sensorId = sensorElement.querySelector('.sensor-button').getAttribute('data-sensor-id');
                    fetchSensorValuesFromServer(sensorId, '2024-04-10T11:32:18.593Z', '2024-04-10T15:32:18.593Z');
                });

                sensorElement.querySelector('.edit-button').addEventListener('click', () => {
                    // Вызываем функцию для редактирования данных сенсора
                    handleEditSensor(id, name, comment, sensorElement);
                });
            });

            // Показываем блок SensorBlock
            sensorBlock.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching sensor data:', error);
        });
    }
    function handleEditSensor(sensorId, currentName, currentComment, sensorElement) {
        const form = document.createElement('form');
        form.innerHTML = `
            <input type="text" id="newNameInput" value="${currentName}">
            <input type="text" id="newCommentInput" value="${currentComment}">
            <button type="submit">Сохранить</button>
            <button type="button" class="cancel-edit">Отмена</button>
        `;
        sensorElement.appendChild(form);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Получаем новые значения из полей ввода
            const newName = document.getElementById('newNameInput').value;
            const newComment = document.getElementById('newCommentInput').value;
            // Отправляем PATCH-запрос на сервер для обновления данных сенсора
            axios.patch(`http://localhost:3000/sensors/${sensorId}`, {
                name: newName,
                comment: newComment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Sensor data updated:', response.data);
                sensorElement.removeChild(form);
    
                // Обновляем отображение данных сенсора
                const sensorNameElement = sensorElement.querySelector('.sensor-name');
                const sensorCommentElement = sensorElement.querySelector('.sensor-comment');
                sensorNameElement.textContent = newName;
                sensorCommentElement.textContent = newComment;
            })
            .catch(error => {
                console.error('Error updating sensor data:', error);
            });
        });
        const cancelButton = form.querySelector('.cancel-edit');
        cancelButton.addEventListener('click', () => {
            // Удаляем форму редактирования данных
            sensorElement.removeChild(form);
        });
    }
    function handleEditDevice(deviceId, currentName, currentComment, deviceElement) {
        // Создаем форму редактирования данных
        const form = document.createElement('form');
        form.innerHTML = `
            <input type="text" id="newDeviceNameInput" value="${currentName}">
            <input type="text" id="newDeviceCommentInput" value="${currentComment}">
            <button type="submit">Сохранить</button>
            <button type="button" class="cancel-edit">Отмена</button>
        `;
        deviceElement.appendChild(form);
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 

            // Получаем новые значения из полей ввода
            const newName = document.getElementById('newDeviceNameInput').value;
            const newComment = document.getElementById('newDeviceCommentInput').value;

            // Отправляем PATCH-запрос на сервер для обновления данных устройства
            axios.put(`http://localhost:3000/devices/${deviceId}`, {
                name: newName,
                comment: newComment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Device data updated:', response.data);

                // Удаляем форму редактирования данных
                deviceElement.removeChild(form);
            })
            .catch(error => {
                console.error('Error updating device data:', error);
            });
        });
        const cancelButton = form.querySelector('.cancel-edit');
        cancelButton.addEventListener('click', () => {
            // Удаляем форму редактирования данных
            deviceElement.removeChild(form);
        });
    }
    axios.get('http://localhost:3000/devices', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        const deviceData = response.data;
        const deviceBlock = document.querySelector('.DeviceBlock');
        deviceData.forEach(device => {
            const { id, name, comment, latitude, longitude } = device;
            const deviceElement = document.createElement('div');
            deviceElement.innerHTML = `
                <button class="device-button" data-device-id="${id}">${name}</button>
                <button class="edit-button">Редактировать</button>
                <p class="device-comment">${comment}</p>
            `;
            deviceElement.classList.add('device-item');
            deviceBlock.appendChild(deviceElement);
            deviceElement.querySelector('.device-button').addEventListener('click', () => {
                handleButtonClick(id);
            });
            // Обработчик события нажатия кнопки редактирования
            deviceElement.querySelector('.edit-button').addEventListener('click', () => {
                // Вызываем функцию для редактирования данных устройства
                handleEditDevice(id, name, comment, deviceElement);
            });
            const deviceLatitude = latitude;
            const deviceLongitude = longitude;
            const map = L.map('map').setView([deviceLatitude, deviceLongitude], 13);
            // Добавляем Map
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            // Добавляем метку на карту по заданным координатам
            const marker = L.marker([deviceLatitude, deviceLongitude]).addTo(map);

        });
    })
    .catch(error => {
        console.error('Error fetching device data:', error);
    });

}
