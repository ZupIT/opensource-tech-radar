(() => {
  const size = 700;
  const svg = d3.select(".cp-tech-radar svg");
  const quadrantGroupButtons = document.querySelectorAll('.pg-radar-quadrant-groups-item');

  if (quadrantGroupButtons) {
    quadrantGroupButtons.forEach((item) => {
      item.addEventListener("mouseover", mouseoverQuadrant);
      item.addEventListener("mouseout", mouseoutQuadrant);
      item.addEventListener("click", selectQuadrant);
    })
  }

  handleSidebarItemsPageRadar();

  function selectQuadrant(e) {
    e.preventDefault();

    $(e.target).addClass('is-active').siblings().removeClass('is-active')

    const { order, startangle } = e.target.dataset;

    const startAngle = Number(startangle)

    d3.selectAll(".home-link").classed("selected", false);
    createHomeLink(d3.select(".pg-radar-main-foot"));

    d3.selectAll(".button")
      .classed("selected", false)
      .classed("full-view", false);
    d3.selectAll(".button." + order).classed("selected", true);
    d3.selectAll(".quadrant-table").classed("selected", false);
    d3.selectAll(".quadrant-table." + order).classed("selected", true);
    d3.selectAll(".blip-item-description").classed("expanded", false);

    var scale = 2;

    var adjustX =
      Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle));
    var adjustY =
      Math.cos(toRadian(startAngle)) + Math.sin(toRadian(startAngle));

    var translateX =
      ((-1 * (1 + adjustX) * size) / 2) * (scale - 1) +
      -adjustX * (1 - scale / 2) * size;
    var translateY =
      -1 * (1 - adjustY) * (size / 2 - 7) * (scale - 1) -
      ((1 - adjustY) / 2) * (1 - scale / 2) * size;

    var translateXAll =
      (((1 - adjustX) / 2) * size * scale) / 2 +
      ((1 - adjustX) / 2) * (1 - scale / 2) * size;
    var translateYAll = (((1 + adjustY) / 2) * size * scale) / 2;

    const containerWidth = document.querySelector('.cp-tech-radar').scrollWidth;

    var moveRight = ((1 + adjustX) * (1 * containerWidth - size)) / 2;
    var moveLeft = ((1 - adjustX) * (1 * containerWidth - size)) / 2;

    var blipScale = 3 / 4;
    var blipTranslate = (1 - blipScale) / blipScale;

    svg.style("left", moveLeft + "px").style("right", moveRight + "px");
    d3.select(".quadrant-group-" + order)
      .transition()
      .duration(1000)
      .attr(
        "transform",
        "translate(" + translateX + "," + translateY + ")scale(" + scale + ")"
      );
    d3.selectAll(".quadrant-group-" + order + " .blip-link text").each(
      function () {
        var x = d3.select(this).attr("x");
        var y = d3.select(this).attr("y");
        d3.select(this.parentNode)
          .transition()
          .duration(1000)
          .attr(
            "transform",
            "scale(" +
            blipScale +
            ")translate(" +
            blipTranslate * x +
            "," +
            blipTranslate * y +
            ")"
          );
      }
    );

    d3.selectAll(".quadrant-group").style("pointer-events", "auto");

    d3.selectAll(".quadrant-group:not(.quadrant-group-" + order + ")")
      .transition()
      .duration(1000)
      .style("pointer-events", "none")
      .attr(
        "transform",
        "translate(" + translateXAll + "," + translateYAll + ")scale(0)"
      );

    toggleLineTexts('block');
  }

  function mouseoverQuadrant(e) {
    const { order } = e.target.dataset;

    d3.select(".quadrant-group-" + order).style("opacity", 1);
    d3.selectAll(".quadrant-group:not(.quadrant-group-" + order + ")").style(
      "opacity",
      0.3
    );
  }

  function mouseoutQuadrant(e) {
    const { order } = e.target.dataset;

    d3.selectAll(".quadrant-group:not(.quadrant-group-" + order + ")").style(
      "opacity",
      1
    );
  }

  function toggleLineTexts(value) {
    d3.selectAll('.line-text').style('display', value)
  }

  function createHomeLink(pageElement) {
    if (pageElement.select(".home-link").empty()) {
      const buttonContainer = pageElement
        .append("div")
        .html("<span>Voltar para o radar</span>")
        .classed("home-link", true)
        .classed("selected", true)
        .on("click", redrawFullRadar)
        .append("svg")
        .attr("width", "16px")
        .attr("height", "16px")
        .attr("viewbox", "0 0 16 16")
        .attr("fill", "none");

      buttonContainer.append("path")
        .attr(
          "d",
          "M0.504639 8H15.4953"
        )
        .attr(
          "stroke", "#1A2138"
        )
        .attr("stroke-width", "0.8")
        .attr("stroke-linecap", "round");

      buttonContainer.append("path")
        .attr(
          "d",
          "M8.49528 0.666504L0.733276 7.49917C0.589776 7.62573 0.507568 7.80784 0.507568 7.99917C0.507568 8.1905 0.589776 8.37261 0.733276 8.49917L8.49528 15.3332"
        )
        .attr(
          "stroke", "#1A2138"
        )
        .attr("stroke-width", "0.8")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");
    }
  }

  function removeHomeLink() {
    d3.select(".home-link").remove();
  }

  function removeRadarLegend() {
    d3.select(".legend").remove();
  }

  function toRadian(angleInDegrees) {
    return (Math.PI * angleInDegrees) / 180;
  }

  function redrawFullRadar() {
    $('.pg-radar-quadrant-groups-item.is-active').removeClass('is-active');

    removeHomeLink();
    removeRadarLegend();

    svg.style("left", 0).style("right", 0);

    d3.selectAll(".button")
      .classed("selected", false)
      .classed("full-view", true);

    d3.selectAll(".quadrant-table").classed("selected", false);
    d3.selectAll(".home-link").classed("selected", false);

    d3.selectAll(".quadrant-group")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)");

    d3.selectAll(".quadrant-group .blip-link")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)");

    d3.selectAll(".quadrant-group").style("pointer-events", "auto");

    toggleLineTexts('none');
  }

  function handleSidebarItemsPageRadar() {
    // const tip = d3tip()
    //   .attr("class", "d3-tip")
    //   .html(function(text) {
    //     return text;
    //   });

    const radarSidebarItems = $('.pg-radar-category-list-item a');

    radarSidebarItems.on('mouseover', (e) => {
      const { id, name } = e.target.dataset;
      const group = $(`#radar svg#radar-plot .blip-link[data-id="${id}"]`);
      
      if (group) {
        d3.selectAll("g.blip-link").attr("opacity", 0.3);
        group.attr("opacity", 1.0);
        // tip.show(name, group.node());
      }
    })

    radarSidebarItems.on("mouseout", (e) => {
      d3.selectAll("g.blip-link").attr("opacity", 1.0);
      // tip.hide().style("left", 0).style("top", 0);
    })
  }
})();