import React from "react"
import { Link } from "gatsby"

const DesktopNav = ({ navMenu }) => {
  function renderNavDropdown(dropdownMenu) {
    return (
      <ul className="absolute flex-col hidden w-[17rem] pt-5 pb-2 pl-2 -mx-3 z-[999] bg-themeBlue-300 group-hover:flex">
        {dropdownMenu.map(renderNavDropdownItem)}
      </ul>
    )
  }

  function renderNavDropdownItem(subMenuItem) {
    const pathVar = subMenuItem?.path
    const anchorPosition = pathVar.indexOf("#")
    let pageAnchor = ""
    if (anchorPosition > 0 && "/" === subMenuItem?.path) {
      pageAnchor = subMenuItem?.path + pathVar.substring(anchorPosition)
    } else {
      pageAnchor = subMenuItem?.path
    }
    pageAnchor = pageAnchor.replace("/blog", "")
    return (
      <li
        key={subMenuItem?.id}
        className="px-2 py-1 mx-2 text-xs font-black text-white uppercase rounded font-Raleway"
      >
        <Link to={pageAnchor} activeClassName="active">
          {subMenuItem?.label}
        </Link>
        {subMenuItem?.childItems?.nodes?.length > 0 &&
          renderNavDropdown(subMenuItem?.childItems?.nodes)}
      </li>
    )
  }

  return (
    <>
      <div className="items-center justify-between hidden w-11/12 py-3 mx-auto lg:flex gap-x-3 bg-themeBlue-500">
        <Link to="/">
          <svg
            width="270"
            height="70"
            viewBox="0 0 450 118"
            xmlns="http://www.w3.org/2000/svg"
            role="image"
            aria-label="Search Marketing Resource logo"
          >
            <filter
              id="a"
              x="-.368"
              y="-160.441"
              width="1.812"
              height="355.311"
            >
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="4" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feFlood result="color" />
              <feComposite in2="offsetblur" operator="in" />
              <feComposite in2="SourceAlpha" operator="in" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode />
              </feMerge>
            </filter>
            <path fill="#01487e" d="M0 0h450v118H0Z" />
            <g
              aria-label="SM"
              fill="#ffad00"
              filter="url(#a)"
              transform="translate(-1.09 -8.48)"
            >
              <path
                d="M29.85 79.56q-4.95 0-10.08-.9-5.04-.9-9.9-2.79V63.81q11.16 4.68 20.79 4.68 5.67 0 8.64-2.07 2.97-2.16 2.97-5.67 0-1.71-.81-2.97-.81-1.35-2.88-2.52t-5.85-2.16l-5.67-1.53q-6.57-1.8-10.44-4.14-3.78-2.43-5.4-5.76-1.62-3.42-1.62-8.19 0-5.31 2.7-9.63 2.7-4.32 8.46-6.84 5.85-2.61 14.67-2.61 4.23 0 9.09.9 4.86.9 8.46 2.43v11.25q-4.41-2.34-9.18-3.42-4.77-1.17-9-1.17-3.96 0-6.57 1.08-2.52.99-3.69 2.61-1.17 1.62-1.17 3.6 0 3.06 1.71 4.59 1.71 1.44 4.68 2.16l8.28 2.16q6.57 1.71 10.53 4.14 3.96 2.34 5.76 5.76 1.8 3.42 1.8 8.37 0 6.75-3.42 11.43-3.42 4.59-9.36 6.93-5.94 2.34-13.5 2.34zM120.75 15.48h16.02v63h-12.15V34.02l-17.19 44.46H95.64L77.82 35.1v43.38H66.75v-63h16.92l18.45 47.16z"
                fill="#ffad00"
                filter="url(#a)"
              />
            </g>
            <g
              aria-label="RESOURCE"
              transform="matrix(1.00339 0 0 .9996 -.5 .012)"
              fill="#ffad00"
              filter="url(#a)"
            >
              <path
                d="M173.84 42.34q1.8 3.06 4.38 6.66h-10.2q-1.2-1.08-2.76-3.72l-6-10.44q-.96-1.62-1.86-2.16-.84-.6-2.28-.6h-1.86V49h-8.82V7h15.36q4.98 0 7.98 1.68 3.06 1.62 4.26 4.26 1.26 2.58 1.26 5.7 0 2.94-1.32 5.34-1.26 2.34-3.48 3.9-2.22 1.56-5.04 2.1v.12q2.04.48 3.3 1.5 1.32.96 2.4 2.76zM157.4 25.6q3.3 0 5.22-1.56 1.98-1.62 1.98-4.74t-1.74-4.62q-1.74-1.5-5.7-1.5h-3.9V25.6ZM190.88 42.64h17.28l-.24 6.36h-25.86V7h25.68l.18 6.36h-17.04v10.8h13.02v6.48h-13.02zM226.16 49.72q-3.3 0-6.72-.6-3.36-.6-6.6-1.86v-8.04q7.44 3.12 13.86 3.12 3.78 0 5.76-1.38 1.98-1.44 1.98-3.78 0-1.14-.54-1.98-.54-.9-1.92-1.68-1.38-.78-3.9-1.44l-3.78-1.02q-4.38-1.2-6.96-2.76-2.52-1.62-3.6-3.84-1.08-2.28-1.08-5.46 0-3.54 1.8-6.42t5.64-4.56q3.9-1.74 9.78-1.74 2.82 0 6.06.6 3.24.6 5.64 1.62V16q-2.94-1.56-6.12-2.28-3.18-.78-6-.78-2.64 0-4.38.72-1.68.66-2.46 1.74t-.78 2.4q0 2.04 1.14 3.06 1.14.96 3.12 1.44l5.52 1.44q4.38 1.14 7.02 2.76 2.64 1.56 3.84 3.84 1.2 2.28 1.2 5.58 0 4.5-2.28 7.62-2.28 3.06-6.24 4.62-3.96 1.56-9 1.56zM268.76 49.72q-7.08 0-11.76-2.88-4.62-2.88-6.84-7.74Q248 34.18 248 28q0-5.82 2.46-10.8t7.14-7.92q4.74-3 11.16-3 6.9 0 11.58 2.82 4.68 2.76 6.9 7.68 2.28 4.86 2.28 11.22 0 6.18-2.22 11.1-2.16 4.86-6.84 7.74-4.62 2.88-11.7 2.88zm0-6.9q5.82 0 8.52-4.08 2.7-4.14 2.7-10.74 0-4.2-1.2-7.5-1.2-3.36-3.72-5.34-2.52-1.98-6.3-1.98t-6.3 1.98q-2.52 1.98-3.72 5.34-1.2 3.3-1.2 7.5 0 6.6 2.7 10.74 2.7 4.08 8.52 4.08zM312.38 49.72q-6 0-9.72-1.68-3.72-1.74-5.46-5.22-1.74-3.48-1.74-9.06V7h8.94v25.2q0 3.48.72 5.82.78 2.28 2.58 3.54 1.86 1.2 5.04 1.2 3.12 0 5.16-1.02t3.06-3.3q1.02-2.34 1.02-6.24V7h8.64v24.72q0 6.36-1.92 10.32-1.86 3.9-5.88 5.82-4.02 1.86-10.44 1.86zM368.48 42.34q1.8 3.06 4.38 6.66h-10.2q-1.2-1.08-2.76-3.72l-6-10.44q-.96-1.62-1.86-2.16-.84-.6-2.28-.6h-1.86V49h-8.82V7h15.36q4.98 0 7.98 1.68 3.06 1.62 4.26 4.26 1.26 2.58 1.26 5.7 0 2.94-1.32 5.34-1.26 2.34-3.48 3.9-2.22 1.56-5.04 2.1v.12q2.04.48 3.3 1.5 1.32.96 2.4 2.76zM352.04 25.6q3.3 0 5.22-1.56 1.98-1.62 1.98-4.74t-1.74-4.62q-1.74-1.5-5.7-1.5h-3.9V25.6ZM395.24 49.72q-6.72 0-11.7-2.52-4.98-2.52-7.74-7.32-2.7-4.86-2.7-11.58 0-6.06 2.52-11.04 2.52-4.98 7.62-7.98t12.48-3q3.24 0 6.48.66 3.24.6 6.12 1.68v7.56q-3.24-1.56-6.42-2.34-3.12-.78-5.7-.78-4.68 0-7.74 1.98-3 1.92-4.38 5.22t-1.38 7.5q0 3.66 1.2 7.02 1.26 3.36 4.2 5.58 3 2.22 7.98 2.22 5.94 0 11.88-2.4l-.18 7.44q-5.64 2.1-12.54 2.1zM423.26 42.64h17.28L440.3 49h-25.86V7h25.68l.18 6.36h-17.04v10.8h13.02v6.48h-13.02z"
                fill="#ffad00"
                filter="url(#a)"
              />
            </g>
            <g aria-label="SEARCHMARKETINGRESOURCE.COM" fill="#fff">
              <path
                d="M147.666 78.688q-.953 0-1.941-.173-.971-.174-1.907-.538v-2.322q2.15.901 4.004.901 1.092 0 1.664-.399.572-.416.572-1.092 0-.329-.156-.572-.156-.26-.555-.485-.398-.225-1.126-.416l-1.092-.295q-1.266-.346-2.011-.797-.728-.468-1.04-1.11-.312-.658-.312-1.576 0-1.023.52-1.855.52-.832 1.63-1.317 1.126-.503 2.825-.503.814 0 1.75.173.936.174 1.63.468v2.167q-.85-.45-1.768-.659-.92-.225-1.734-.225-.762 0-1.265.208-.485.19-.71.503-.226.312-.226.693 0 .59.33.884.329.277.9.416l1.595.416q1.266.33 2.028.797.763.45 1.11 1.11.346.658.346 1.611 0 1.3-.659 2.202-.658.884-1.802 1.334-1.144.451-2.6.451zM157.286 76.643h4.992l-.07 1.837h-7.47V66.347h7.418l.052 1.837h-4.922v3.12h3.761v1.872h-3.761zM170.493 66.347 175 78.48h-2.843l-1.352-3.9h-4.142l-1.421 3.9h-2.583l4.801-12.133zm-3.172 6.361h2.86l-1.386-4.073zM184.845 76.556q.52.884 1.265 1.924h-2.946q-.347-.312-.798-1.075l-1.733-3.016q-.277-.468-.537-.624-.243-.173-.659-.173h-.537v4.888h-2.548V66.347h4.437q1.439 0 2.305.485.884.468 1.231 1.23.364.746.364 1.648 0 .849-.381 1.542-.364.676-1.006 1.127-.64.45-1.455.606v.035q.589.139.953.433.381.278.693.798zm-4.75-4.836q.954 0 1.509-.45.572-.469.572-1.37 0-.901-.503-1.334-.502-.434-1.646-.434H178.9v3.588zM192.576 78.688q-1.942 0-3.38-.728-1.439-.728-2.236-2.115-.78-1.404-.78-3.345 0-1.75.728-3.19.728-1.438 2.201-2.304 1.473-.867 3.605-.867.936 0 1.872.19.936.174 1.768.486v2.184q-.936-.45-1.854-.676-.902-.225-1.647-.225-1.352 0-2.236.572-.867.554-1.265 1.507-.399.954-.399 2.167 0 1.057.347 2.028.364.97 1.213 1.612.867.641 2.305.641 1.716 0 3.432-.693l-.052 2.15q-1.63.606-3.622.606zM205.731 66.347h2.583V78.48h-2.583v-5.113h-5.026v5.113h-2.583V66.347h2.583v5.113h5.026zM221.418 66.347h3.085V78.48h-2.34v-8.562l-3.31 8.562h-2.271l-3.432-8.355v8.355h-2.132V66.347h3.258l3.554 9.082zM233.793 66.347 238.3 78.48h-2.843l-1.352-3.9h-4.142l-1.422 3.9h-2.582l4.801-12.133zm-3.172 6.361h2.86l-1.386-4.073zM248.145 76.556q.52.884 1.265 1.924h-2.946q-.347-.312-.798-1.075l-1.733-3.016q-.277-.468-.537-.624-.243-.173-.659-.173h-.537v4.888h-2.548V66.347h4.437q1.439 0 2.305.485.884.468 1.231 1.23.364.746.364 1.648 0 .849-.381 1.542-.364.676-1.006 1.127-.64.45-1.456.606v.035q.59.139.954.433.381.278.693.798zm-4.75-4.836q.954 0 1.509-.45.572-.469.572-1.37 0-.901-.503-1.334-.502-.434-1.646-.434H242.2v3.588zM261.509 78.48h-3.172l-5.252-5.737v5.737h-2.583V66.347h2.583v5.598l4.992-5.598h2.877l-5.165 5.772zM264.663 76.643h4.992l-.069 1.837h-7.47V66.347h7.418l.052 1.837h-4.923v3.12h3.762v1.872h-3.762zM274.231 78.48V68.219h-4.16l.052-1.872h10.816l.052 1.872h-4.143V78.48zM282.378 78.48V66.347h2.634V78.48zM295.672 66.347h2.253V78.48h-1.976l-6.135-7.99v7.99h-2.236V66.347h2.132l5.962 7.782zM306.418 78.688q-2.062 0-3.587-.71-1.508-.729-2.323-2.098-.815-1.387-.815-3.328 0-2.219.971-3.657.97-1.439 2.513-2.097 1.56-.66 3.328-.66 1.075 0 2.063.192.988.19 1.768.537v2.15q-.798-.417-1.803-.66-.988-.242-1.89-.242-1.212 0-2.166.45-.936.434-1.49 1.387-.538.953-.538 2.392 0 1.421.555 2.41.572.97 1.508 1.473.936.485 2.062.485.26 0 .572-.035.312-.034.624-.086v-4.16h2.48l-.036 5.668q-2.392.589-3.796.589ZM321.134 76.556q.52.884 1.266 1.924h-2.947q-.347-.312-.797-1.075l-1.734-3.016q-.277-.468-.537-.624-.243-.173-.659-.173h-.537v4.888h-2.548V66.347h4.437q1.439 0 2.306.485.884.468 1.23 1.23.364.746.364 1.648 0 .849-.381 1.542-.364.676-1.005 1.127-.642.45-1.456.606v.035q.589.139.953.433.381.278.693.798zm-4.749-4.836q.953 0 1.508-.45.572-.469.572-1.37 0-.901-.503-1.334-.502-.434-1.646-.434h-1.127v3.588zM326.057 76.643h4.992l-.07 1.837h-7.47V66.347h7.418l.052 1.837h-4.922v3.12h3.761v1.872h-3.761zM336.249 78.688q-.954 0-1.942-.173-.97-.174-1.906-.538v-2.322q2.149.901 4.004.901 1.092 0 1.664-.399.571-.416.571-1.092 0-.329-.156-.572-.156-.26-.554-.485-.399-.225-1.127-.416l-1.092-.295q-1.265-.346-2.01-.797-.728-.468-1.04-1.11-.312-.658-.312-1.576 0-1.023.52-1.855.52-.832 1.629-1.317 1.127-.503 2.825-.503.815 0 1.75.173.937.174 1.63.468v2.167q-.85-.45-1.768-.659-.918-.225-1.733-.225-.763 0-1.265.208-.486.19-.711.503-.225.312-.225.693 0 .59.329.884.33.277.901.416l1.595.416q1.265.33 2.028.797.762.45 1.11 1.11.346.658.346 1.611 0 1.3-.659 2.202-.659.884-1.803 1.334-1.143.451-2.6.451zM348.555 78.688q-2.045 0-3.397-.832-1.335-.832-1.976-2.236-.624-1.421-.624-3.207 0-1.68.71-3.12.711-1.438 2.063-2.287 1.37-.867 3.224-.867 1.993 0 3.345.815 1.352.797 1.994 2.218.658 1.404.658 3.241 0 1.786-.641 3.207-.624 1.404-1.976 2.236-1.335.832-3.38.832zm0-1.993q1.681 0 2.461-1.179.78-1.196.78-3.103 0-1.213-.346-2.166-.347-.97-1.075-1.543-.728-.572-1.82-.572t-1.82.572q-.728.572-1.075 1.543-.346.953-.346 2.166 0 1.907.78 3.103.78 1.179 2.461 1.179zM361.156 78.688q-1.733 0-2.808-.485-1.075-.503-1.577-1.508-.503-1.006-.503-2.618v-7.73h2.583v7.28q0 1.005.208 1.681.225.659.745 1.023.537.346 1.456.346.901 0 1.49-.294.59-.295.885-.954.294-.676.294-1.802v-7.28h2.496v7.141q0 1.837-.554 2.981-.538 1.127-1.699 1.682-1.161.537-3.016.537zM377.362 76.556q.52.884 1.266 1.924h-2.947q-.347-.312-.797-1.075l-1.734-3.016q-.277-.468-.537-.624-.243-.173-.659-.173h-.537v4.888h-2.548V66.347h4.437q1.44 0 2.306.485.884.468 1.23 1.23.364.746.364 1.648 0 .849-.38 1.542-.365.676-1.006 1.127-.642.45-1.456.606v.035q.59.139.953.433.381.278.693.798zm-4.749-4.836q.953 0 1.508-.45.572-.469.572-1.37 0-.901-.503-1.334-.502-.434-1.646-.434h-1.127v3.588zM385.093 78.688q-1.941 0-3.38-.728-1.439-.728-2.236-2.115-.78-1.404-.78-3.345 0-1.75.728-3.19.728-1.438 2.201-2.304 1.474-.867 3.606-.867.936 0 1.871.19.936.174 1.768.486v2.184q-.936-.45-1.854-.676-.901-.225-1.647-.225-1.352 0-2.236.572-.866.554-1.265 1.507-.399.954-.399 2.167 0 1.057.347 2.028.364.97 1.213 1.612.867.641 2.306.641 1.715 0 3.431-.693l-.052 2.15q-1.629.606-3.622.606zM393.187 76.643h4.992l-.069 1.837h-7.47V66.347h7.418l.052 1.837h-4.923v3.12h3.762v1.872h-3.762zM401.282 78.775q-.503 0-.867-.208t-.554-.555q-.191-.364-.191-.797 0-.746.45-1.144.451-.416 1.162-.416.71 0 1.161.416.468.398.468 1.144 0 .433-.19.797-.191.347-.573.555-.363.208-.866.208zM410.19 78.688q-1.94 0-3.379-.728t-2.236-2.115q-.78-1.404-.78-3.345 0-1.75.728-3.19.728-1.438 2.201-2.304 1.474-.867 3.606-.867.936 0 1.872.19.936.174 1.768.486v2.184q-.936-.45-1.855-.676-.901-.225-1.647-.225-1.352 0-2.236.572-.866.554-1.265 1.507-.399.954-.399 2.167 0 1.057.347 2.028.364.97 1.213 1.612.867.641 2.306.641 1.716 0 3.432-.693l-.052 2.15q-1.63.606-3.623.606zM420.73 78.688q-2.046 0-3.398-.832-1.335-.832-1.976-2.236-.624-1.421-.624-3.207 0-1.68.71-3.12.711-1.438 2.063-2.287 1.37-.867 3.224-.867 1.994 0 3.346.815 1.352.797 1.993 2.218.659 1.404.659 3.241 0 1.786-.642 3.207-.624 1.404-1.976 2.236-1.334.832-3.38.832zm0-1.993q1.68 0 2.46-1.179.78-1.196.78-3.103 0-1.213-.346-2.166-.347-.97-1.075-1.543-.728-.572-1.82-.572t-1.82.572q-.728.572-1.074 1.543-.347.953-.347 2.166 0 1.907.78 3.103.78 1.179 2.461 1.179zM439.068 66.347h3.085V78.48h-2.34v-8.562l-3.31 8.562h-2.271l-3.432-8.355v8.355h-2.132V66.347h3.258l3.554 9.082z"
                fill="#fff"
                transform="translate(-1.09 -8.48)"
              />
            </g>
            <g
              aria-label="A Digital Marketing Company"
              fill="#ffad00"
              strokeWidth="1.004"
            >
              <path
                d="M9.03 115.792q-.08-.053-.238-.264-.185-.186-.291-.397-.106-.212-.08-.37 0-.16.291-.16.556.768 1.562.583 1.006-.186 2.17-.927 1.165-.714 2.356-1.826 1.217-1.085 2.17-2.17.98-1.085 1.588-1.959.635-.873.635-1.164 0-.08-.211-.238-.212-.186-.503-.371-.265-.185-.503-.344-.238-.159-.291-.238.08-.265.503-.397.423-.16.952-.265.53-.132 1.033-.238.529-.132.794-.318 1.402-2.038 2.435-3.652 1.058-1.641 1.985-3.203.952-1.588 1.932-3.255.979-1.667 2.25-3.758.343-.583.555-.397.212.185.318.9.106.714.132 1.826.026 1.085 0 2.355t-.106 2.594q-.053 1.323-.132 2.435-.053 1.112-.106 1.932-.027.794 0 1.032.106 1.35.132 2.356.053.979.265 1.826.212.82.715 1.614.529.768 1.588 1.694-.874.291-1.456-.053-.556-.317-.926-.979-.345-.688-.583-1.561-.211-.9-.423-1.72-.185-.848-.45-1.456-.238-.636-.662-.82h-.159q-.105-.027-.264-.027-.133 0-.265.026h-.185q-.238.053-.9.212-.635.159-1.403.344-.767.185-1.482.37-.688.186-1.006.265-.661.185-1.402.847-.715.662-1.535 1.615-.794.926-1.668 2.038-.847 1.111-1.747 2.17-.9 1.058-1.826 1.958-.926.9-1.853 1.456-.926.556-1.852.609-.953.08-1.853-.53zm14.345-11.645q.053.026.265.026.238 0 .317-.026.477-.08 1.191-.185.715-.106 1.43-.239.714-.158 1.323-.344.609-.211.847-.45l.08-.555q.079-.556.184-1.403.106-.873.212-1.906.133-1.058.238-2.064.106-1.006.16-1.853.079-.873.105-1.35-.291-.132-.767.689-.477.794-1.244 2.196-.741 1.403-1.827 3.282-1.058 1.853-2.514 3.864zM51.345 110.605q-.132-.397.053-.688.185-.318.556-.53 1.64-.82 3.202-1.376 1.562-.582 3.07-1.138 1.536-.582 3.044-1.27 1.509-.715 3.07-1.827 3.468-2.011 5.32-3.758 1.853-1.747 2.462-3.15.608-1.429.158-2.487-.45-1.085-1.561-1.747-1.112-.662-2.726-.873-1.588-.239-3.308.026-1.72.265-3.362 1.059-1.64.767-2.832 2.143-.026.053-.08.186-.052.132-.105.29-.026.133-.08.292-.026.132-.026.159-.794 1.905-1.508 3.282-.689 1.35-1.324 2.62-.609 1.244-1.164 2.673-.556 1.403-1.059 3.414-.476.16-.688-.026-.185-.186-.212-.556-.026-.397.08-.9.132-.503.29-.98.16-.476.318-.873.159-.397.212-.555.212-.61.662-1.562.45-.98.952-2.038.503-1.059.953-2.038.45-.98.688-1.588-.238-.767-.105-1.35.158-.608.529-1.085.37-.503.9-.9.53-.423 1.058-.82 1.509-1.112 3.256-1.72 1.747-.61 3.546-.662 1.827-.08 3.626.45 1.8.53 3.388 1.72 1.27 1.059 1.482 2.303.238 1.244-.344 2.567-.582 1.297-1.826 2.647-1.218 1.35-2.858 2.646-1.641 1.297-3.573 2.515-1.906 1.19-3.838 2.223-1.906 1.006-3.732 1.8-1.8.767-3.229 1.217-1.403.45-2.303.556-.9.08-1.032-.291zM74.316 110.605q1.085-3.494 1.958-5.532.9-2.064 1.483-2.885.608-.82.82-.529.212.291-.053 1.482-.238 1.191-1.059 3.203-.794 1.985-2.25 4.552-.211.08-.502.026-.291-.052-.397-.317zm4.632-12.73q-.053-.133-.053-.477t.053-.424q.608-.211.926-.052.317.158.397.476.08.291-.027.635-.079.344-.29.53-.212.158-.504.052-.264-.132-.502-.74zM78.68 118.36q-.82-.291-1.323-.874-.53-.582-.794-1.27-.291-.662-.344-1.35-.08-.688.026-1.217.08-.53.318-.82.212-.266.503-.133-.027 2.302.556 3.467.555 1.19 1.482 1.482.9.318 2.064-.132 1.138-.45 2.303-1.403 1.19-.926 2.25-2.25 1.085-1.297 1.826-2.726.74-1.403 1.058-2.779.318-1.403-.026-2.54-2.382 1.72-3.706 2.17-1.323.45-1.852.053-.503-.424-.318-1.483.185-1.058.794-2.329.609-1.27 1.535-2.54.927-1.297 1.906-2.17.98-.874 1.879-1.112.926-.239 1.535.555.609.82.768 2.224.158 1.376-.08 3.07t-.847 3.546q-.582 1.853-1.455 3.6-.874 1.773-2.012 3.282-1.111 1.508-2.408 2.514-1.297 1.006-2.726 1.35-1.43.37-2.912-.185zm5.4-13.128q-.027.08-.053.291v.9q.026.212.052.291.847.212 1.747-.397.9-.608 1.641-1.561.768-.953 1.27-2.012.53-1.058.636-1.773.132-.715-.265-.794-.397-.106-1.456.847-.317.291-.846.794-.53.503-1.086 1.085-.529.582-1.005 1.217-.45.61-.636 1.112zM93.631 110.605q1.086-3.494 1.959-5.532.9-2.064 1.482-2.885.609-.82.82-.529.212.291-.052 1.482-.239 1.191-1.06 3.203-.793 1.985-2.249 4.552-.211.08-.503.026-.29-.052-.397-.317zm4.632-12.73q-.053-.133-.053-.477t.053-.424q.609-.211.926-.052.318.158.397.476.08.291-.026.635-.08.344-.291.53-.212.158-.503.052-.265-.132-.503-.74zM103.977 110.605q-.026-.053-.026-.291t.026-.318q.08-.291.291-1.006.212-.74.45-1.535.239-.82.45-1.535.212-.714.291-1.005.106-.371.239-.847.132-.503.053-.953-.397-.053-.98.106-.582.132-1.164.238-.556.08-1.059 0-.476-.106-.688-.635.318-.662.953-.847.635-.212 1.376-.291.741-.08 1.403-.239.688-.158 1.085-.714.238-.688.556-1.668l.714-2.09q.37-1.086.794-2.144.45-1.059.927-1.88.29-.185.476-.026.185.159.265.476.106.292.132.61.027.317 0 .423-.159.688-.556 1.482-.37.767-.714 1.561-.318.794-.53 1.588-.185.794 0 1.509h5.69q.027 0 .133.185.106.159.185.265.133.37-.29.503-.424.132-1.139.185-.715.027-1.64.053-.9 0-1.748.132-.82.106-1.482.397-.662.265-.9.82-.688 1.774-1.27 3.574-.582 1.773-1.112 3.6-.053.079-.211.264-.16.159-.345.291-.185.106-.37.08-.159-.027-.265-.318zM115.964 110.287q-.635-.53-.714-1.561-.053-1.032.29-2.33.371-1.296 1.06-2.699.714-1.43 1.64-2.7.927-1.296 2.012-2.302 1.085-1.032 2.17-1.509 1.085-.503 2.117-.344 1.033.132 1.88 1.191.529.662.635 1.35.106.662-.027 1.376-.132.688-.423 1.43-.291.714-.583 1.455-.264.741-.45 1.509-.158.767-.052 1.561.132 1.006.9 1.191.767.186 1.826-.106 1.085-.29 2.276-.926 1.19-.635 2.197-1.27 1.032-.636 1.693-1.112l.689-.476q.74-.16.82.106.106.238-.291.74-.37.477-1.138 1.112-.768.609-1.747 1.191-.98.582-2.09 1.059-1.112.476-2.171.662-1.059.158-2.012-.027-.926-.212-1.535-.953-.29-.317-.45-.635-.132-.318-.45-.556-.397.37-.952.98-.556.582-1.218 1.19-.635.583-1.376 1.112-.715.53-1.482.794-.768.265-1.562.185-.767-.079-1.482-.688zm.291-.9q.238.847 1.059.794.82-.079 1.906-.82 1.085-.741 2.25-2.012 1.164-1.296 2.09-2.858.926-1.588 1.403-3.335.503-1.747.265-3.44-.636-.503-1.589-.027-.952.45-2.037 1.509-1.06 1.032-2.118 2.488-1.032 1.429-1.826 2.91-.794 1.457-1.217 2.753-.397 1.297-.186 2.038z"
                fill="#ffad00"
                strokeWidth="1.004"
                transform="matrix(1.00377 0 0 .99625 -1.09 -8.48)"
              />
              <path
                d="M136.05 110.605q-.768-.556-1.006-1.403-.212-.847-.053-1.826.159-1.006.556-2.064.423-1.06.9-2.038.503-.98.953-1.8.476-.82.74-1.35.08-.159.371-.768.318-.608.662-1.323.344-.714.635-1.323l.397-.794q.08-.133.212-.503.159-.397.344-.847.185-.45.397-.847.238-.423.476-.609.265-.185.503-.053.265.133.503.794-.106.265-.53 1.06l-.952 1.905q-.556 1.111-1.244 2.461-.662 1.35-1.297 2.726-.635 1.376-1.19 2.7-.557 1.297-.927 2.382-.344 1.058-.424 1.773-.053.688.265.847.37.185.953.159.609-.053 1.244-.159.635-.106 1.244-.212.608-.132 1.058-.106.106.239-.158.477-.265.212-.742.397-.476.159-1.111.29-.609.107-1.191.16-.556.053-1.006.026-.423-.026-.582-.132zM180.482 112.67q-.026-.027-.026-.16 0-.105.026-.158.027-.053.106-.318.08-.265.185-.556.106-.29.186-.556.08-.264.106-.344.767-2.461 1.35-4.393.582-1.959 1.111-3.811.53-1.853 1.032-3.812.53-1.985 1.165-4.499v-.582q-.768-.265-1.668.053-.873.317-1.8 1.032-.926.715-1.879 1.72-.952.98-1.852 2.091-.9 1.085-1.747 2.17-.847 1.06-1.562 1.959-.714.873-1.296 1.456-.556.556-.9.635-.238.053-.583-.053-.344-.132-.344-.265v-1.8q.08-.29.212-.926.159-.635.318-1.429.185-.794.37-1.667.212-.874.37-1.668.186-.794.318-1.403.133-.635.212-.952.132-.609.238-1.191.133-.583.053-1.218-.794-.264-1.694.424-.9.661-1.852 1.958-.927 1.297-1.88 3.017-.952 1.72-1.852 3.547-.9 1.826-1.747 3.6-.82 1.773-1.509 3.149-.688 1.35-1.217 2.17-.503.794-.794.688-.37-.105-.291-.873.106-.767.53-1.932.423-1.191 1.084-2.673.662-1.509 1.43-3.097.794-1.588 1.614-3.176.82-1.588 1.562-2.938.74-1.35 1.296-2.355.583-1.032.847-1.509.556.212.98.159.423-.08.794-.291.37-.212.714-.503.37-.291.82-.556.953-.582 1.51-.503.555.08.793.583.265.502.265 1.376 0 .847-.132 1.853-.133 1.005-.37 2.064-.213 1.032-.424 1.932-.212.873-.37 1.509-.133.608-.107.767.212.106.344-.026.16-.133.265-.265.08-.132.37-.503.318-.37.715-.847.397-.503.847-1.058.45-.556.847-1.033.423-.503.715-.873.29-.37.397-.503 2.302-1.826 3.89-2.7 1.615-.9 2.594-1.005 1.006-.106 1.456.476.45.582.476 1.668.027 1.058-.318 2.567-.344 1.482-.926 3.202-.08.238-.318 1.006-.211.741-.529 1.773-.317 1.006-.662 2.144-.317 1.138-.635 2.17-.317 1.006-.556 1.774-.211.74-.29.979 0 .026-.054.344-.052.318-.185.768-.106.423-.265.9-.158.502-.397.9-.238.396-.555.608-.291.212-.662.08-.026 0-.132-.133-.106-.106-.133-.159zM190.325 110.287q-.635-.53-.714-1.561-.053-1.032.29-2.33.371-1.296 1.06-2.699.714-1.43 1.64-2.7.927-1.296 2.012-2.302 1.085-1.032 2.17-1.509 1.085-.503 2.118-.344 1.032.132 1.879 1.191.53.662.635 1.35.106.662-.027 1.376-.132.688-.423 1.43-.291.714-.582 1.455-.265.741-.45 1.509-.159.767-.053 1.561.132 1.006.9 1.191.767.186 1.826-.106 1.085-.29 2.276-.926 1.191-.635 2.197-1.27 1.032-.636 1.694-1.112l.688-.476q.741-.16.82.106.106.238-.29.74-.371.477-1.139 1.112-.767.609-1.747 1.191-.979.582-2.09 1.059-1.112.476-2.17.662-1.06.158-2.012-.027-.927-.212-1.535-.953-.291-.317-.45-.635-.133-.318-.45-.556-.397.37-.953.98-.556.582-1.217 1.19-.636.583-1.377 1.112-.714.53-1.482.794-.767.265-1.561.185-.768-.079-1.483-.688zm.292-.9q.238.847 1.058.794.82-.079 1.906-.82 1.085-.741 2.25-2.012 1.164-1.296 2.09-2.858.927-1.588 1.403-3.335.503-1.747.265-3.44-.635-.503-1.588-.027-.953.45-2.038 1.509-1.059 1.032-2.118 2.488-1.032 1.429-1.826 2.91-.794 1.457-1.217 2.753-.397 1.297-.185 2.038zM209.67 110.605q-.053-.027 0-.609.08-.609.212-1.508.132-.9.344-1.985.212-1.086.45-2.065.238-1.006.503-1.747.29-.767.555-1.058.186-.186.37 0 .186.158.371.423.186.238.371.45.185.185.397.027.741-1.033 1.614-1.959.9-.953 1.986-1.641.105-.08.582-.238.476-.185 1.085-.344.609-.185 1.244-.291.662-.133 1.111-.106.477 0 .636.238.185.212-.16.741-1.587.027-2.963.926-1.377.9-2.541 2.224-1.165 1.323-2.118 2.884-.952 1.536-1.667 2.859-.688 1.323-1.165 2.197-.45.873-.661.873-.027 0-.238-.106-.212-.132-.318-.185zM234.493 109.996q-1.694-2.329-2.726-3.838-1.032-1.535-1.694-2.276-.661-.74-1.085-.714-.423.026-.926.82-.477.768-1.191 2.276-.715 1.509-1.959 3.732-.159.291-.344.37-.159.054-.317 0-.16-.079-.292-.264-.132-.185-.211-.397-.08-.265.185-1.006.265-.767.768-1.826.529-1.085 1.217-2.382.715-1.323 1.482-2.7.794-1.376 1.562-2.726.794-1.35 1.455-2.488.689-1.164 1.218-2.037.53-.874.767-1.297.186-.133.37-.027.213.106.345.344.159.212.212.477.053.238-.053.397l-2.382 4.181v.61q.556.131 1.376-.08.847-.238 1.8-.662.98-.423 1.985-.98 1.006-.581 1.905-1.137.927-.583 1.641-1.085.741-.53 1.165-.847.344-.186.609-.106.29.08.423.29.159.213.132.504-.026.29-.264.53-.741.767-1.773 1.322-1.006.53-2.144.98-1.138.423-2.33.82-1.164.37-2.25.82-1.084.45-1.984 1.006-.9.556-1.482 1.324.344.29.9.926.582.609 1.244 1.376.688.768 1.376 1.641.688.847 1.217 1.668.556.794.9 1.455.37.636.37 1.006v.609q-.211.106-.396.08-.159-.054-.318-.16-.159-.105-.291-.238-.106-.159-.212-.29zM246.321 110.605q-.794-.265-1.217-.794-.397-.556-.53-1.218-.132-.661-.052-1.376.105-.74.317-1.403.794-.847 1.773-1.932 1.006-1.111 2.118-2.17 1.111-1.059 2.302-1.959 1.218-.926 2.462-1.402.423-.186.662.026.264.185.37.609.106.423.08.98 0 .555-.08 1.084-.08.53-.212.953-.132.424-.264.582-.318.371-1.244.874-.9.503-2.012 1.111-1.111.583-2.223 1.218-1.112.635-1.826 1.27-.715.609-.847 1.218t.74 1.111q.9.106 2.171-.079 1.297-.212 2.62-.53 1.35-.343 2.594-.687 1.244-.371 2.038-.583l.318.291q-.583.768-1.906 1.403t-2.858 1.059q-1.535.397-2.991.53-1.456.105-2.303-.186zm6.326-10.11q-.027-.027-.397.238-.37.238-.926.661-.53.397-1.165.9-.609.477-1.138.9-.503.424-.847.741-.344.291-.291.291.423.08 1.085-.105.688-.212 1.403-.583.74-.37 1.402-.82.662-.477 1.033-.927.397-.45.397-.794.026-.344-.556-.502zM259.5 110.605q-.027-.053-.027-.291t.026-.318q.08-.291.291-1.006.212-.74.45-1.535.238-.82.45-1.535.212-.714.291-1.005.106-.371.239-.847.132-.503.052-.953-.397-.053-.979.106-.582.132-1.164.238-.556.08-1.06 0-.475-.106-.687-.635.317-.662.953-.847.635-.212 1.376-.291.74-.08 1.403-.239.688-.158 1.085-.714.238-.688.556-1.668l.714-2.09q.37-1.086.794-2.144.45-1.059.927-1.88.29-.185.476-.026.185.159.265.476.105.292.132.61.026.317 0 .423-.159.688-.556 1.482-.37.767-.714 1.561-.318.794-.53 1.588-.185.794 0 1.509h5.69q.027 0 .133.185.106.159.185.265.132.37-.291.503-.423.132-1.138.185-.715.027-1.641.053-.9 0-1.747.132-.82.106-1.482.397-.662.265-.9.82-.688 1.774-1.27 3.574-.583 1.773-1.112 3.6-.053.079-.212.264-.158.159-.344.291-.185.106-.37.08-.159-.027-.265-.318zM270.269 110.605q1.085-3.494 1.958-5.532.9-2.064 1.482-2.885.609-.82.82-.529.212.291-.052 1.482-.238 1.191-1.059 3.203-.794 1.985-2.25 4.552-.211.08-.502.026-.292-.052-.397-.317zm4.631-12.73q-.053-.133-.053-.477t.053-.424q.609-.211.927-.052.317.158.397.476.079.291-.027.635-.08.344-.291.53-.212.158-.503.052-.265-.132-.503-.74zM288.528 110.605q-.08-.874.132-1.72.239-.874.61-1.694.396-.847.82-1.668.45-.847.767-1.64.318-.821.45-1.589.132-.794-.106-1.561-.661-.238-1.535.106-.847.344-1.8 1.058-.952.688-1.985 1.641-1.005.927-1.985 1.906l-1.826 1.826q-.873.873-1.588 1.456-.688.556-1.164.714-.477.133-.636-.344-.026-.026.292-.661.344-.662.82-1.641l1.085-2.118q.609-1.138 1.138-2.117.53-1.006.927-1.694t.502-.741q.556.37.556.82.027.424-.132.9-.159.45-.37.927-.186.476-.054.953.424-.292 1.165-.794.768-.53 1.64-1.086.9-.555 1.854-1.085.979-.53 1.826-.82.847-.318 1.508-.344.689-.027 1.006.397.318.423.185 1.402-.105.953-.82 2.62-.08.186-.397.9-.291.689-.662 1.51-.344.793-.661 1.508l-.37.873q-.027.106-.08.397-.027.265-.08.609-.053.317-.159.635-.105.291-.264.45-.159.159-.37-.026-.212-.212-.239-.265zM291.384 118.36q-.82-.291-1.323-.874-.53-.582-.795-1.27-.29-.662-.344-1.35-.079-.688.027-1.217.08-.53.318-.82.211-.266.502-.133-.026 2.302.556 3.467.556 1.19 1.482 1.482.9.318 2.065-.132 1.138-.45 2.302-1.403 1.191-.926 2.25-2.25 1.085-1.297 1.826-2.726.741-1.403 1.059-2.779.318-1.403-.027-2.54-2.382 1.72-3.705 2.17-1.323.45-1.853.053-.502-.424-.317-1.483.185-1.058.794-2.329.609-1.27 1.535-2.54.926-1.297 1.905-2.17.98-.874 1.88-1.112.926-.239 1.535.555.608.82.767 2.224.159 1.376-.08 3.07-.237 1.694-.846 3.546-.582 1.853-1.456 3.6-.873 1.773-2.011 3.282-1.112 1.508-2.409 2.514-1.297 1.006-2.726 1.35-1.429.37-2.911-.185zm5.4-13.128q-.027.08-.054.291v.9q.027.212.053.291.847.212 1.747-.397.9-.608 1.64-1.561.768-.953 1.271-2.012.53-1.058.635-1.773.133-.715-.264-.794-.397-.106-1.456.847-.318.291-.847.794-.53.503-1.085 1.085-.53.582-1.006 1.217-.45.61-.635 1.112zM324.62 110.605q-1.614-.635-2.222-1.72-.609-1.086-.503-2.409.132-1.35.847-2.858.74-1.535 1.8-3.07 1.085-1.536 2.382-2.991 1.296-1.456 2.567-2.673 1.27-1.218 2.382-2.118 1.111-.9 1.8-1.323.952-.582 1.588-.556.635 0 1.005.397.397.37.53 1.059.158.661.132 1.429 0 .741-.159 1.509-.132.74-.37 1.296-.212.556-.477.82-.238.266-.476.027-.027-.211.053-.635.08-.45.185-1.006.132-.555.238-1.138.106-.582.133-1.058.052-.503-.027-.847-.053-.344-.291-.397-.926-.238-2.223.45-1.27.661-2.673 1.932-1.377 1.244-2.753 2.911-1.35 1.641-2.461 3.388-1.112 1.747-1.827 3.414-.714 1.641-.82 2.911-.08 1.244.556 1.933.661.661 2.302.423 1.509-.212 2.78-1.059 1.296-.873 2.487-1.905 1.218-1.059 2.409-2.065 1.19-1.032 2.488-1.561.476-.185.74.132.292.318.16.768-.16.45-.953 1.19-.768.742-1.932 1.562-1.138.794-2.515 1.615-1.376.794-2.7 1.376-1.296.582-2.434.847-1.112.265-1.747 0zM342.14 110.605q-1.112-.45-1.403-1.35-.265-.9.026-1.985.291-1.112 1.006-2.276.714-1.191 1.588-2.17.873-.98 1.747-1.641.9-.688 1.535-.768 1.64-.212 2.567.238.953.424 1.297 1.244.344.82.185 1.932-.159 1.086-.714 2.197-.53 1.112-1.403 2.144-.847 1.032-1.906 1.747-1.032.688-2.197.926-1.164.212-2.329-.238zm-.292-1.509q.212.847.9.953.688.08 1.588-.344.926-.45 1.932-1.27 1.006-.847 1.826-1.827.847-.979 1.377-1.958.555-1.006.529-1.747 0-.741-.715-1.112-.688-.397-2.329-.158-.37.344-.952.847-.583.476-1.218 1.058-.609.583-1.217 1.27-.61.662-1.06 1.377-.45.715-.66 1.456-.186.74 0 1.455zM369.398 110.287q-.292-.344-.345-.767-.026-.45.053-.874.106-.45.265-.847.185-.423.344-.767.106-.265.424-.953l.714-1.482.741-1.43.477-.952v-.582q-.265-.133-1.085.37-.821.477-1.906 1.35-1.085.847-2.303 1.906-1.217 1.058-2.302 2.038-1.059.952-1.853 1.72-.794.74-1.006.98-.582.184-.767-.24-.16-.449-.08-1.217.08-.794.318-1.746.238-.98.476-1.827l.45-1.482q.212-.608.186-.661-.53-.186-1.112.132-.582.318-1.191.953-.609.609-1.218 1.455-.608.82-1.217 1.668-.609.82-1.165 1.588-.555.74-1.058 1.217-.503.477-.953.556-.424.08-.741-.397-.027-.026-.027-.132 0-.106.027-.159.132-.265.397-.82.291-.583.635-1.297.344-.715.741-1.482l.741-1.483q.37-.714.635-1.27.292-.556.45-.82.133-.265.37-.662.24-.424.477-.794.239-.397.424-.662l.185-.291h.635q.186.609-.053 1.138-.238.53-.582 1.032-.318.503-.556 1.006-.211.476 0 1.032 2.276-2.011 3.494-2.964 1.244-.953 1.747-1.085.503-.133.476.397-.026.53-.238 1.429-.185.9-.397 2.064-.185 1.139-.027 2.224h.318q.159-.106.53-.397.37-.291.793-.636.45-.344.82-.635.398-.29.557-.397.29-.238.847-.661l1.111-.847q.582-.45 1.032-.768.477-.344.61-.423.105-.08.449-.318.37-.265.794-.556.45-.29.847-.53.397-.264.582-.396.397-.265.741-.238.344.026.556.264.238.212.291.61.053.37-.106.846-.635 1.191-1.27 2.33-.609 1.137-1.138 2.302-.503 1.138-.847 2.355-.318 1.218-.344 2.594-.132.08-.291 0-.133-.08-.265-.212t-.238-.264l-.08-.133zM373.894 120.16q-.238-1.483.16-3.018.37-1.508 1.005-3.017.609-1.509 1.244-3.017.635-1.482.873-2.912 0-.053.212-.317.238-.265.503-.556.29-.318.503-.582.238-.291.264-.344.424-.927.847-1.694.45-.794.688-1.535.239-.741.212-1.456-.026-.741-.53-1.588-.052-.053-.052-.159 0-.106.053-.132.767-.98 1.773-1.641 1.006-.662 2.144-1.059 1.138-.397 2.355-.53 1.218-.131 2.409-.052 1.006.847 1.27 1.932.291 1.059.027 2.223-.238 1.138-.927 2.303-.661 1.164-1.535 2.17-.873 1.006-1.852 1.8-.953.794-1.8 1.217-.768.37-1.138.503-.344.106-.688.133-.344.026-.847.052-.477.027-1.482.212-.45.08-.768.424-.291.317-.503.74-.185.398-.317.821-.106.45-.212.715-.476 1.164-.873 2.144-.371 1.005-.715 1.958-.37.98-.715 2.012-.344 1.032-.714 2.25-.053.132-.186.211-.132.106-.264.106-.159.026-.265-.053-.132-.053-.159-.265zm5.982-12.255q1.217.238 2.355-.132 1.165-.37 2.17-1.138 1.006-.794 1.8-1.88.82-1.11 1.377-2.328.555-1.218.82-2.435.265-1.244.159-2.276-.37-.318-.9-.318-.503-.027-.9.026-1.43.186-2.25.741-.82.53-1.35 1.35-.502.82-.873 1.906-.37 1.059-.9 2.302-.105.186-.317.662-.212.45-.45.98-.238.502-.45.979-.212.476-.291.661zM393.636 110.287q-.635-.53-.715-1.561-.053-1.032.291-2.33.371-1.296 1.06-2.699.714-1.43 1.64-2.7.926-1.296 2.012-2.302 1.085-1.032 2.17-1.509 1.085-.503 2.117-.344 1.032.132 1.88 1.191.529.662.634 1.35.106.662-.026 1.376-.132.688-.423 1.43-.292.714-.583 1.455-.264.741-.45 1.509-.158.767-.053 1.561.133 1.006.9 1.191.768.186 1.826-.106 1.086-.29 2.277-.926 1.19-.635 2.196-1.27 1.033-.636 1.694-1.112l.688-.476q.741-.16.82.106.107.238-.29.74-.37.477-1.138 1.112-.768.609-1.747 1.191-.98.582-2.091 1.059-1.112.476-2.17.662-1.059.158-2.012-.027-.926-.212-1.535-.953-.291-.317-.45-.635-.132-.318-.45-.556-.397.37-.953.98-.555.582-1.217 1.19-.635.583-1.376 1.112-.715.53-1.482.794-.768.265-1.562.185-.767-.079-1.482-.688zm.291-.9q.238.847 1.059.794.82-.079 1.905-.82t2.25-2.012q1.165-1.296 2.09-2.858.927-1.588 1.404-3.335.502-1.747.264-3.44-.635-.503-1.588-.027-.953.45-2.038 1.509-1.058 1.032-2.117 2.488-1.032 1.429-1.826 2.91-.794 1.457-1.218 2.753-.397 1.297-.185 2.038zM422.535 110.605q-.08-.874.132-1.72.239-.874.61-1.694.396-.847.82-1.668.45-.847.767-1.64.318-.821.45-1.589.132-.794-.106-1.561-.661-.238-1.535.106-.847.344-1.8 1.058-.952.688-1.985 1.641-1.005.927-1.985 1.906l-1.826 1.826q-.873.873-1.588 1.456-.688.556-1.164.714-.477.133-.636-.344-.026-.026.292-.661.344-.662.82-1.641l1.085-2.118q.609-1.138 1.138-2.117.53-1.006.927-1.694t.502-.741q.556.37.556.82.027.424-.132.9-.159.45-.37.927-.186.476-.054.953.424-.292 1.165-.794.768-.53 1.64-1.086.9-.555 1.854-1.085.979-.53 1.826-.82.847-.318 1.508-.344.689-.027 1.006.397.318.423.185 1.402-.105.953-.82 2.62-.08.186-.397.9-.291.689-.662 1.51-.344.793-.661 1.508l-.37.873q-.027.106-.08.397-.027.265-.08.609-.053.317-.159.635-.105.291-.264.45-.159.159-.37-.026-.212-.212-.239-.265zM424.464 121.06q-.238-.371.027-1.165.238-.768.715-1.615.45-.82.952-1.561.477-.715.715-1.033.212-.29.662-.873.423-.582.979-1.323t1.164-1.562l1.191-1.535q.556-.74 1.006-1.323.45-.582.662-.874.212-.238 0-.74-.212-.504-.662-1.165-.423-.688-.979-1.482-.53-.82-.98-1.641-.423-.847-.661-1.668-.212-.82 0-1.535.291-.212.635.265.344.45.715 1.27.397.794.82 1.774.424.952.82 1.746.398.768.768 1.218.397.45.741.185.689-.503 1.35-1.27.662-.794 1.27-1.641.61-.847 1.139-1.641.555-.82 1.032-1.43.185-.238.344-.317.185-.106.556.027.29.105-.106.926-.397.82-1.244 2.117-.847 1.297-2.038 2.964-1.165 1.641-2.488 3.441-1.297 1.773-2.62 3.547-1.297 1.773-2.382 3.282-1.112 1.535-1.88 2.673-.793 1.164-1.031 1.694l-.212.476q-.133.238-.344.397-.053-.026-.133-.106-.105-.08-.185-.185-.106-.08-.185-.185-.106-.08-.132-.133z"
                fill="#ffad00"
                strokeWidth="1.004"
                transform="matrix(1.00377 0 0 .99625 -1.09 -8.48)"
              />
            </g>
          </svg>
        </Link>
        <nav aria-label="Primary Navigation" className="w-7/12 ml-auto">
          <ul className={`flex p-0 leading-4 items-center justify-between`}>
            {navMenu.map((menuItem, i) => {
              const pathVar = menuItem?.path
              const anchorPosition = pathVar.indexOf("#")
              let pageAnchor = ""
              if (anchorPosition > 0 && "/" === menuItem?.path) {
                pageAnchor = menuItem?.path + pathVar.substring(anchorPosition)
              } else {
                pageAnchor = menuItem?.path
              }
              pageAnchor = pageAnchor.replace("/blog", "")
              return (
                <li
                  key={menuItem?.id}
                  className={`py-1 text-white ${
                    menuItem?.childItems?.nodes?.length > 0
                      ? "group relative "
                      : ""
                  } `}
                >
                  <Link
                    data-id={menuItem?.label}
                    to={pageAnchor}
                    className="py-1 text-xs font-black tracking-wide uppercase rounded x-2 font-Raleway"
                    activeClassName="active"
                    partiallyActive={menuItem?.label === "News" ? true : false}
                  >
                    {menuItem?.label}
                    {menuItem?.childItems?.nodes?.length > 0 && (
                      <i className="mx-1 h-[0.5em] w-[0.5em] inline-block align-middle border-l-[0.18em] border-l-solid border-l-white border-b-[0.18em] border-b-solid border-b-white -rotate-45 -mt-[0.25em] transition duration-150 ease-in-out group-hover:rotate-[225deg] group-hover:border-l-themeOrange-200 group-hover:border-b-themeOrange-200"></i>
                    )}
                  </Link>
                  {menuItem?.childItems?.nodes?.length > 0
                    ? renderNavDropdown(menuItem?.childItems?.nodes)
                    : ""}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default DesktopNav
