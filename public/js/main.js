function openModal(id) {
    document
        .getElementById('floatNav')
        .classList
        .remove('open');

    document
        .getElementById(id)
        .classList
        .add('open');

    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document
        .getElementById(id)
        .classList
        .remove('open');

    document.body.style.overflow = '';
}

function toggleNav(event) {
    event.stopPropagation();

    document
        .getElementById('floatNav')
        .classList
        .toggle('open');
}

document
    .getElementById('floatNav')
    .addEventListener(
        'click',
        function (event) {
            event.stopPropagation();
        }
    );

document.addEventListener(
    'click',
    function () {
        document
            .getElementById('floatNav')
            .classList
            .remove('open');
    }
);

document
    .querySelectorAll('.modal-overlay')
    .forEach(
        function (overlay) {

            overlay.addEventListener(
                'click',
                function (event) {

                    if (
                        event.target === overlay
                    ) {
                        closeModal(overlay.id);
                    }

                }
            );

        }
    );

document.addEventListener(
    'keydown',
    function (event) {

        if (event.key === 'Escape') {

            document
                .querySelectorAll(
                    '.modal-overlay.open'
                )
                .forEach(
                    function (overlay) {
                        closeModal(overlay.id);
                    }
                );

            document
                .getElementById('floatNav')
                .classList
                .remove('open');
        }

    }
);