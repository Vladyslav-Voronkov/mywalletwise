const fs = require('fs');

// Чтение файла
const fileData = fs.readFileSync('test.datas.json');
const jsonData = JSON.parse(fileData);

// Объект для хранения комбинаций имени и категории
const combinations = {};

// Анализировать каждую запись
for (let i = 0; i < jsonData.length; i++) {
    const record = jsonData[i];

    // Получение значения имени и категории из записи
    const name = record.name;
    const category = record.category;

    // Формирование уникального ключа для комбинации имени и категории
    const key = name;

    // Увеличение счетчика для данной комбинации
    if (combinations.hasOwnProperty(key)) {
        combinations[key][category] = (combinations[key][category] || 0) + 1;
    } else {
        combinations[key] = {
            [category]: 1
        };
    }
}

// Формирование массива с наиболее часто повторяющимися комбинациями
const result = [];

for (const key in combinations) {
    if (combinations.hasOwnProperty(key)) {
        const combination = combinations[key];
        let maxCategory = null;
        let maxCount = 0;

        // Найти наиболее часто повторяющуюся категорию
        for (const category in combination) {
            if (combination.hasOwnProperty(category)) {
                const count = combination[category];
                if (count > maxCount) {
                    maxCount = count;
                    maxCategory = category;
                }
            }
        }

        result.push({
            name: key,
            category: maxCategory
        });
    }
}

fs.writeFileSync('trained.json', JSON.stringify(result, null, 2));

console.log('Результат сохранен в файл "trained.json".');
