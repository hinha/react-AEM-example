import _ from "lodash";

export const Component = [
  {
    id: "aaa",
    items: {
      title: "",
    },
  },
];

export const LayoutData = _.map(_.range(0, 5), function (item, i) {
  var y = Math.ceil(Math.random() * 2) + 1;
  return {
    minW: 2,
    minH: 2,
    x: (_.random(0, 5) * 2) % 12,
    y: Math.floor(i / 6) * y,
    w: 4,
    h: 2,
    i: i.toString(),
    content: {
      id: i.toString(),
      header: {
        title: {
          text: "Title " + i,
          size: "17px",
          class: "card-title",
          weight: "normal",
        },
        subTitle: {
          text: "Sub Title " + i,
          size: "9px",
        },
      },
      body: "",
    },
  };
});

// {
//   "id": "image-f4b958f398",
//   "alt": "Lava flowing into the ocean",
//   "title": "Lava flowing into the ocean",
//   "src": "/content/core-components-examples/library/page-authoring/image/_jcr_content/root/responsivegrid/demo_554582955/component/image.coreimg.jpeg",
//   "srcUriTemplate": "/content/core-components-examples/library/page-authoring/image/_jcr_content/root/responsivegrid/demo_554582955/component/image.coreimg{.width}.jpeg",
//   "areas": [],
//   "lazyThreshold": 0,
//   "dmImage": false,
//   "uuid": "0f54e1b5-535b-45f7-a46b-35abb19dd6bc",
//   "widths": [],
//   "lazyEnabled": false,
//   ":type": "core-components-examples/components/image",
//   "dataLayer": {
//     "image-f4b958f398": {
//       "@type": "core-components-examples/components/image",
//       "dc:title": "Lava flowing into the ocean",
//       "image": {
//         "repo:id": "0f54e1b5-535b-45f7-a46b-35abb19dd6bc",
//         "repo:modifyDate": "1970-01-01T00:00:00Z",
//         "@type": "image/jpeg",
//         "repo:path": "/content/dam/core-components-examples/library/sample-assets/lava-into-ocean.jpg",
//         "xdm:tags": [],
//         "xdm:smartTags": {}
//       }
//     }
//   }
// }
