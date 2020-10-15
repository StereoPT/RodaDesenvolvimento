$(function() {
    let rodaCompletion = [false, false, false, false];
    let completion = 0;
    if(localStorage.rodaCompletion) {
        rodaCompletion = JSON.parse(localStorage.getItem('rodaCompletion'));
    }
    if(localStorage.completion) {
        completion = localStorage.getItem('completion');
    }

    rodaCompletion.map((complete, i) => {
        if(complete) {
            $('#roda path').eq(i).css({ fill: '#E14726', stroke: '#E14726' });
            $('#etapas input[type="checkbox"]').eq(i)[0].checked = true;
        }
    });

    $('#etapasProgress .progress-bar').css({ width: completion * 25 + '%' });
    $('#etapasProgress .progress-bar').text(completion * 25 + '%');

    $('#etapas input[type="checkbox"]').change(function() {
        const etapa = $(this).attr('etapa');
        rodaCompletion[etapa] = $(this)[0].checked;
        
        completion = rodaCompletion.reduce((acc, val) => (val ? acc + 1 : acc), 0);

        $('#etapasProgress .progress-bar').css({ width: completion * 25 + '%' });
        $('#etapasProgress .progress-bar').text(completion * 25 + '%');

        rodaCompletion.map((complete, i) => {
            if(complete) {
                $('#roda path').eq(i).css({ fill: '#E14726', stroke: '#E14726' });
            } else {
                $('#roda path').eq(i).css({ fill: '#F1F2F4', stroke: '#F1F2F4' });
            }
        });

        if(completion >= 4) {
            $('#completedModal').modal('show');
        }

        localStorage.setItem('rodaCompletion', JSON.stringify(rodaCompletion));
        localStorage.setItem('completion', completion);
    });

    $('#roda').on('click', 'path', function() {
        const etapa = parseInt($(this).attr('etapa'));
        
        $("#etapas").children().eq(etapa).find('.collapse').collapse('toggle');
    });

    $('#roda').on('mouseenter', 'path', function() {
        $(this).css({ fill: '#E14726', stroke: '#E14726' });
    });

    $('#roda').on('mouseleave', 'path', function() {
        const etapa = parseInt($(this).attr('etapa'));

        if(!$('#etapas input[type="checkbox"]').eq(etapa)[0].checked) {
            $(this).css({ fill: '#F1F2F4', stroke: '#F1F2F4' });
        }
    });
});