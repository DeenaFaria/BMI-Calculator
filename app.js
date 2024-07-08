var app = angular.module('bmiCalculatorApp', []);

app.controller('BmiController', ['$scope', function($scope) {
    $scope.weightUnits = ['kg', 'lbs'];
    $scope.heightUnits = ['cm', 'ft'];

    $scope.calculateBMI = function() {
        var weightInKg = convertWeightToKg($scope.weight, $scope.weightUnit);
        var heightInMeters = convertHeightToMeters($scope.height, $scope.heightUnit);
        
        if (weightInKg && heightInMeters) {
            $scope.bmi = weightInKg / (heightInMeters * heightInMeters);
            $scope.bmiCategory = getBMICategory($scope.bmi);
            $scope.bmiSuggestion = getBMISuggestion($scope.bmiCategory);
        }
    };

    function convertWeightToKg(weight, unit) {
        if (unit === 'lbs') {
            return weight * 0.453592;
        }
        return weight; // already in kg
    }

    function convertHeightToMeters(height, unit) {
        if (unit === 'ft') {
            if (height.includes("'")) {
                var parts = height.split("'");
                var feet = parseFloat(parts[0]);
                var inches = parseFloat(parts[1]) || 0;
                return (feet * 0.3048) + (inches * 0.0254);
            } else {
                var decimalHeight = parseFloat(height);
                var feet = Math.floor(decimalHeight);
                var inches = (decimalHeight - feet) * 10;
                return (feet * 0.3048) + (inches * 0.0254);
            }
        }
        return height / 100; // convert cm to meters
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obesity';
        }
    }

    function getBMISuggestion(bmiCategory) {
        switch(bmiCategory) {
            case 'Underweight':
                return 'You are underweight. Consider a balanced diet to gain weight healthily.';
            case 'Normal weight':
                return 'You have a normal weight. Maintain your current lifestyle and diet.';
            case 'Overweight':
                return 'You are overweight. Consider a balanced diet and regular exercise to lose weight.';
            case 'Obesity':
                return 'You are in the obesity range. It is advisable to consult with a healthcare provider for personalized advice.';
            default:
                return '';
        }
    }
}]);
