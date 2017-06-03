angular.module('lottoApp')
    .service('ModalService', ['$log', function() {

        var service = {},
            myModal = {},
            myResult = {};

        service.id = id;
        service.close = close;
        service.setModal = setModal;
        service.setResults = setResults;
        service.getResults = getResults;

        return service;

        // be able to return the modal id
        function id() {
            return myModal.id;
        }

        // close the modal
        function close() {
            myModal.close();
        }

        // set the modal that we want to track
        function setModal(modal) {
            myModal = modal;
        }

        function setResults(result) {
            myResult = result;
        }

        function getResults() {
            return myResult;
        }
    }]);