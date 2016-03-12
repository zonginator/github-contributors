function getToken () {
  return $("#githubToken").val();
}

function formatCollaborators (data) {
  var stuff = _.map(data, function(item) {
    return `<tr><td class="githubid">${item.login}</td><td>${item.contributions}</td></tr>`;
  });
  var thing = $('<table class="table"></table>');
  _.each(stuff, function(item) {
    thing.append(item);
  });
  return thing;
}

function format (project, data) {
  var header = `<h4 class="list-group-item-heading">${project}</h4>`;
  var body = formatCollaborators(data);
  return $(`<div class="list-group">${header}</div>`).append(body);
}

function setHeader (xhr) {
  xhr.setRequestHeader('Authorization', `token ${getToken()}`);
}

function interrogateGithub (project) {
  var url = `https://api.github.com/repos/${project}/contributors`;
  $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          success: function(data, status, jqXHR) {
              $(".results").append(format(project, data));
          },
          error: function(error) {
            $(".alert").show();
            console.error(error);
            $(".alert").append(`<li>${project} - ${error.responseText}</li>`);
          },
          beforeSend: setHeader
        });
}

function filter (projects) {
  return (_.compact(_.map(projects.data, function(item) { return item.Project; })));
}

function loadData () {
  Papa.parse("data/projects.csv", { 
    download: true, 
    header: true, 
    complete: function(projects) {
      $(".results").empty();
      $(".alert").hide();
      $(".alert").empty();
      _.each(filter(projects), interrogateGithub);
      // doStuff(filter(projects)[0]);
    }});
}

$(".generate").click(loadData);