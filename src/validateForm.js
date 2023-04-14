const validateForm = (data) => {
    const errorsArr = [];

    const fields = [
        { name: 'taskName', required: true, pattern: '[a-ząćęłńóśżź]{3,}', label: 'Tytuł zadania' },
        { name: 'taskOwner', required: true, pattern: '[a-ząćęłńóśżź]{3,}', label: 'Odpowiedzialny' },
        { name: 'taskDescription', required: true, pattern: '[a-ząćęłńóśżź]{3,}', label: 'Opis zadania' },
        { name: 'taskDeadline', required: true, label: 'Termin' },
    ];

    fields.forEach(({ name, label, required = false, pattern = null }) => {
        const value = data[name];

        if (required) {
            if (value === '') {
                errorsArr.push(`Pole ${label} jest wymagane!`);
            }
        }

        if (pattern) {
            const reg = new RegExp(pattern, 'gi');
            if (!reg.test(value)) {
                errorsArr.push(`Pole ${label} nie jest w odpowiednim formacie!`);
            }
        }
    });

    return errorsArr;
};

export default validateForm;
