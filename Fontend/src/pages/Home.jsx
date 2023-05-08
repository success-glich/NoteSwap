import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import heroImg from "../assets/image/hero.png";

import { motion } from "framer-motion";
import products from "../assets/data/products";
import Services from "../services/Servics";
import counterImg from "../assets/images/counter-timer-img.png";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchNotes } from "../redux/slices/noteSlice";
import NoteList from "../components/UI/NoteList";
import Clock from "../components/UI/Clock";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [bcaNotes, setBcaNotes] = useState([]);
  const [bitNotes, setBitNotes] = useState([]);
  const [bbmNotes, setBbmNotes] = useState([]);
  const [bbaNotes, setBbaNotes] = useState([]);
  const [trendingNotes, setTrendingNotes] = useState([]);

  const year = new Date().getFullYear();

  //     (item) => item.category === "chair"
  //   );
  //   setTrendingNotes([
  //     {
  //       title: "Dot Net",
  //       description:
  //         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis illo doloribus esse quos maxime obcaecati ipsa odio suscipit delectus.",
  //       imgUrl:
  //         "data:image/png;base64,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",
  //     },
  //     {
  //       title: "Dot Net",
  //       description:
  //         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis illo doloribus esse quos maxime obcaecati ipsa odio suscipit delectus.",
  //       imgUrl:
  //         "data:image/png;base64,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",
  //     },
  //     {
  //       title: "Dot Net",
  //       description:
  //         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis illo doloribus esse quos maxime obcaecati ipsa odio suscipit delectus.",
  //       imgUrl:
  //         "data:image/png;base64,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",
  //     },
  //     {
  //       title: "Dot Net",
  //       description:
  //         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis illo doloribus esse quos maxime obcaecati ipsa odio suscipit delectus.",
  //       imgUrl:
  //         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA8FBMVEX09PT/vVn+vVkgICAAAAD29vb5+fnz9vn7+/vx8fEdHR3W1taPj4/9wWQaGhr/wFoqKioVFRU+Pj4PDw9DQ0Pm5ualpaULCwve3t7s7OwkJCRTU1O4uLjAwMDMzMz7zImFhYVgYGB6enr53LVOTk6srKwAABo2NjYYGx/jqVH/ulBvb2+enp6VlZUADhxoaGgLFR3LmEvwslVvVjIAABsqJyI9MyewhEOBYzeQbjsEEh3Zok/BkUicdz5mUDD1tldEOCh8XzYzLSW3ikWkfEBRQivBonbnyqJYRitMUljBl1UwOEDss13YplzWs4L1w33jp6MSAAAPZUlEQVR4nO2dCXfbNhLHaZFAwKOUKIoiqYMVtZJlVWfcuknttG6TZrfd8/t/m50BwEOHXcGx61cb//cSUBQAi78MBgMMrBgGF/VcYrxmvfnq7I8l62pYCrCYhnXWaHAiomjsFdqyauKwOJrq74NC1tWwtM86XRqWggSshnbwp0jPhgrSsBRUwWo0m41jpYZVqoTVvHz37rIJ5W1Rfno3b2pYdRWwGpfmen112Wjcfr9eO/Nm4/bn9fpa0pJ1NSwJq/nDtWmuf2w2361N8/q9KLe/aFh1VbC2AOmHZvNXAUnA+lbDqquENV9vtzDsGpcX19v1DZTm9fb8rYZVV7E2bDRv3r8HRo3m/P0vRfm2Kd6TdXUEL3YdkBZIYGs2z6ryTMMqVVpWAeusuQsLacm6ehhWw/BbGH4Qis5/+fatLD8IahqWFHfwaE8351vu2Ofb7fY7cFaXUKKDr+1naVhy16EKHa55yCBCCAgdGno2LFUMw+aPe0HpJ4T1vqmHYU2lz7q9Wq8/3jbObn8+X/fm4NY/n6+3cx061FU5+NtPn265IX0oy8umDh3qqkKHMxkxnMlwqyz1MCxUwhLx1VkZZ1XxloZVqAgdzpq/Xl29w32sTx97P4ry6ofmmQ4daipDhw/njgNxVfPmuwvn/BOU51C+06FDXWXo8B7irC3EWT8WcRaUFz/thA7awRdbNBiEgiWBhYl468N3UP6ws0WjYYFlieXyT+fn3+KIfH9+/tst0Hu/Pv98e6Ytq6YCFnit+VzMgvN58VoGFRqWVC3OEgHomSyL1xpWJRk67B+dqb8407CkToClLavQPqwzDetuactSUOXgKz9/IFlXwypCh+OYNKy6tGUpSIcOCtIOXkE6dFCQtiwFaQevIB06KEhbloJ06KAg7eAVpEMHBWnLUpB28ArSoYOCtGUpSIcOCtIOXkE6dFCQtiwFqTh4feRI/9rv6dKwFKRhKUjDUpCGpSANS0GnwXrDBbDExZvn/tTPpNNg/U3o7/+QF6+U1mmwvhFqyvIbDeseWHvfg9TQsDSsP5KGpSANS0EaloI0LAVpWArSsBSkYSnoT4VF/uLr8KeBRaQYq/AQRm3bYJTUKwjVm9Hqcq+acbTNn6kngUWGsw5X38sEHEDlepNWa5ZPU8BBFrN2qYktn5zYnU57xPCSbdrtDSNRp1TbY3m71uhJqdyhJ4FFB5bPFcTWJkJbIWRkxb7j+IHVGjKD5qFfKGilJSzT960p0mKTMOwDrLKWb43hXtVoZj+DbT0VLNP0wzC2HDPsJTiAcrgTWrHlm4iD9K04DkzTDOLY6lWweo7pWFAfYPk+wnLgRsAFsDq1Ri376dkc6MlghV7iul3HN4MJ+C4PWFnjzB10YsDhUnjP7cZQCUq3aMZhmX7HIDVYfj9KuCKCdZf7jf5MPRmsuMsAUjTzTWvAEmQ1AOdO2SY0g5yi8x9CpSWr+3cOy4wXrA4rZzUHz6Bnq8tekoMXsNBXUSAS5GwJljbmnpukLce0IiLeipe01kwMQ6A7ZTuw9nq2utR4Hj0xLGLEpj9ji8C0MmEM/Hq4C4syFEFYwXjiO6Fb81lmqwcyO7To+cXCMljPcVokB0CJhOWFMCJpAYvx6pvFYrGJEBa4OrDFDu1XsBxUMGNFzy8XFg1NZ9eyxgBrSOuWxVYWKuGwRqwL90d5NRuGqPgVwKKZ8Fk4hwmfZc8OfBYdLMbj8SKSsNgiNoOeWc6GRspFip5fJCxwQpT0A/TXrgUGkuEkxkZAol/4/kOfBbBIClOoaR7OhsbLhbVMoyibQKDQBkRjDK+WSeQuAJuV7cGSkrAM6sZOBatvC8tKi55fICzT7PUcCNiDwIUIyW7HEEAFPYjAAZpwP3fCMtBtmdVsyNXrE+OlwoIJDNdwodVPeAiRbqwAZzU/jqcicAJYwG0XlunHfCENbssJxNpQ9AM9dSQs58XBCoQ5tMdDGWsTOty0gtCZeYkMMukwaPl7sFotk88DJO20euCsolapwrL8lv+yYBmGLURY9VyU2bjAq+1wQYXDZuKC4CUp++G6q9GfpyeCdXSHbv/O4QpvZyOw1k+t5TMtC7n0HryCNCwFPRss5cF0b4PDsfnFg5VQVK0bSt98xb/4tsRw9L9YU96Dv1vifcYMdP6kqFu1OnKjaFAkO2r35VMwgnNJPTdSVd/PgZyKiiWDbre7rA6GMnj967tf35a0mvOz5iErVVh0XEtHtNOoXWUdVjx2j5b9WWu2GdjUoMt2Z8Y/EfPgKiFsBdUjESbMOm2+V8GS1QQa5N2Ux2zZrDObltMsIcNFG6OUKjdSVI8YSdqdtthJoyPe/4msyDjGxf24YrWEl9fnn28LEs231z/Pj9BShAUhZZVo8NOkyjNYGEWxqW+J3MVsSJln+WJDApZEvuXC4tHy4xxtgE4tvAHjYRVjssMJLGfAeDTrV4EpTSZWgN2FVi5zIytLVo9XNnaHnRgkgYvxqREaNIO1gzUqhyFb4aJk+7nRrFg5F1eXhyNRFdZGZhYgXI/jNIHLIusAsACPY8KDWIEJmJgXm7GEFZocVgifEqHynXyENS4bONaK8XVSCYu6PtwGK4DlZNiKcO95I3MjIVQfUlgxBRjPsk0gdjtOEUlizortsfqtxmrrVN96+wWwCKYjpriTzDMLACvYlFkHfFTTyofucANWTo/DMnGtLWHxhaK1gAZ9vBjSOixiz4C5s8yyZeybIVDhj4W5keHYQrT4GhqRDHfJ2L2fuxJf3MKn22UV//5VxWoNrC7MI+PwAQ6e4Ydb8d0VhLVgpYdv+yY8BOYuBjkld8ByTMAqYNlgV1aXNxhZmPupw6JLuDVLMTeS4Ob+lOdG4gFuD7EE7RPWUI7fInQSOGXO7Y9hwT/1gV3F/eq/7BOsepdf7rM4L4Ql1nkcFq3d9ycyh485L4TlMpik67CgRZ8JWJjPCUTSghDMFbmsblkT3xQ7PoasWOVGDDENMnzwKbZZnmpYCOsIK7v8ImrwV8jqmH//cli4XwNy+pR2i513+UEAlt/PUbiFymHBattCtyVgFXv2sjIYTwWLpNC6LZLTxAYn1eOuqdjB5kctCOn4zqyNqYCTIweAdYQVkbCkXV0dZfUYsETWoU9xh9mq5n3+/KbPvT+6VAGrZ2OGIxOw0ODk00vSNVgR2Gm/8PUt+BE0L/0487xRJvevHWfnp/4hrO74CCsZwQvffherR4Alsg7W5KhlmTxfAZNdCcuAOcxpLUOENapZ1uqYZXUMOagDR1qWiCSZHwtAbAJd+22VkDQx9lhN8AaHJcfgXawew2cVWYcdn0UFrHCKs6YrHlNYFgLB7DTAApcD8wPvlHbQQ+34LLzjio38IVoZ8hQ/12AtR8AiWWyKjNLptIoLySrnQx1hNT8IVsd8+2PBKmdDe1bOhtmICQcvUhmlgwdY4nQEwqJpMb3xIMKf2WI2FB3SFU6QhMJVitNsl+dGAtFhAQsPA2CfCrD2WMlTUQCrmAfvsqtHgVVkHQhaioizFnfFWfzBWD/gsIgInLwkcsf8xASPs8ThENclaQ/Cq/YwioYt+DEdu5YbWfqFn2J932k9BJb4J4tzaWmwkP6wvt+uHsNn9eTeMMQAdAEf4N4InsMiEZ4SAVjEwONKcdgLQ74A4eMNjx3FsTUhNOOnmOAd3wx4vJ/K3EiIY6+C9RDLqvl2CWt/Hjyy7/AwWE4BK6yyDn3Gz7WFPHch1oaxU64NHQ4LQnH8dOCaHCfGxzfGskForcDbYabDkbMrWGDWwpUmdtdxRW4kL3IjVi4WzmCl/gNgFf6qcvb/5P7qY8mqeflIsMKWw/cYSNKrsg4YXYI1LFpBaE66NoUP5LR8CctsBQjLbIkhwzyzZfI1sGjgz8Yupz8Myu4wMki7HTMMev2pUeRGBnkP+m+Pin0I1u+11I8KFmOwbMiG8R6r+ecvX+5w7eQYSolpkOcuxM7abjVZyqeu8he7yY7dJAZhNE2SlFUbdZSlu7kR+wFpDsmqX9nV0Nq3q6uPjwRrJ8ewf8b4aAaClEmKg7d2d+7u6+74DfUsx6FdDQSry8qurrbfPxKsv7TIXXZ1VRuDVxfOcVg7egWwpF2RPbu6qtnVxYWpYRnFYY36PDg8HIMXeEPD4vtZEDkbu3YV/OvfFSsHWDnXbzUsDis+YDWLys0/bldHWb1KWNa+vwpmSbn5NzfvZPUqYW0O7YoWm3+C1fYoq1cIq9vft6tWQovNP8Hq/Dir1weLuPY+q7Tc/LvZ3mNXrxBWbfOvGIPl5t8N9+3ru1i9QliFKn+Fr3Dz7+biXrt6ACxxwMM4WJORYru8+rc7OM+228vzSrJqR+Xm302Pz4M3927+qcFKbYZ/iC0OZAtG8OyuneAKF/9yxU07ZURy5TVJkhakSXpqtv2ptGtXCGt+v796ACwynCw8+LNgm/HYNljepSmxgR7pJmMW2WQDIPvMjghJO+N+wgCpTVKS2oDOyyjeB2TpcKmSY3h8lXZVfAz2Hx9ZXZR2deyEliIsOpiyfDpl3cEmASNyPaBGx663icbRKIGiP+rbub0YDWi0YNEm22yycdoii27eH67c0XiReousO86f7VgyVzEPlvbNXM5qe1N8j1jz9qfyK8VKqcIadjbd4ZQNpptll7Kx1x8Ol6PM62eLiBcbNpxuBpuVxwCWvVmQxPNWXnfVzRJvmeXMG3jjbs6GzwqLTcUYLA9IsCz2TdO/+O/Xhf73/cevD6RsWUvCBrmXk5xREuWJm1MzW66AUjJaribZxOtHeZTDiEs7Xp4NxotsOLOdaJm53spdrDbDxXi58p7VsvZ8O7IykVWcMfnFh2/s38N2+aKUqoNHj2MnCYAi/AV4ocggSWRHdopFGqU0oilmE5LEpjQCrwBVKDot8GyJQROokaQnn3p5fB2xqwBZ+VmRTQd/G/rtI2dNVGdDIreEi0CBiDu8FL/sbBRzYDn3lZWK1s954p0e2pWDrEK3PA4ErEy/8wiw/uoiSS1uR0l/VbOrCFiVh5t29NpgGSQPd+2Kj0HHrcbgDI+7WMe+5fb1wYraVmVXNLPiIAhrYzCaWUEYW4Njx+NeHSwDpvOSFYkW/PeSS1YGGeGNVXT0KOHrgwXmVMtTMvF7ydWb/DU9PgG9RlgPloalIA1LQRqWgjQsBWlYCtKwFKRhKUjDUpCGpSANS0EaloI0LAVpWArSsBSkYSlIw1KQhqUgDUtBGpaCNCwFaVgK0rAUpGEpSMNSkIZ1uv4P2sGgK/HJeSUAAAAASUVORK5CYII=",
  //     },
  //     {
  //       title: "Dot Net",
  //       description:
  //         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis illo doloribus esse quos maxime obcaecati ipsa odio suscipit delectus.",
  //       imgUrl:
  //         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA8FBMVEX09PT/vVn+vVkgICAAAAD29vb5+fnz9vn7+/vx8fEdHR3W1taPj4/9wWQaGhr/wFoqKioVFRU+Pj4PDw9DQ0Pm5ualpaULCwve3t7s7OwkJCRTU1O4uLjAwMDMzMz7zImFhYVgYGB6enr53LVOTk6srKwAABo2NjYYGx/jqVH/ulBvb2+enp6VlZUADhxoaGgLFR3LmEvwslVvVjIAABsqJyI9MyewhEOBYzeQbjsEEh3Zok/BkUicdz5mUDD1tldEOCh8XzYzLSW3ikWkfEBRQivBonbnyqJYRitMUljBl1UwOEDss13YplzWs4L1w33jp6MSAAAPZUlEQVR4nO2dCXfbNhLHaZFAwKOUKIoiqYMVtZJlVWfcuknttG6TZrfd8/t/m50BwEOHXcGx61cb//cSUBQAi78MBgMMrBgGF/VcYrxmvfnq7I8l62pYCrCYhnXWaHAiomjsFdqyauKwOJrq74NC1tWwtM86XRqWggSshnbwp0jPhgrSsBRUwWo0m41jpYZVqoTVvHz37rIJ5W1Rfno3b2pYdRWwGpfmen112Wjcfr9eO/Nm4/bn9fpa0pJ1NSwJq/nDtWmuf2w2361N8/q9KLe/aFh1VbC2AOmHZvNXAUnA+lbDqquENV9vtzDsGpcX19v1DZTm9fb8rYZVV7E2bDRv3r8HRo3m/P0vRfm2Kd6TdXUEL3YdkBZIYGs2z6ryTMMqVVpWAeusuQsLacm6ehhWw/BbGH4Qis5/+fatLD8IahqWFHfwaE8351vu2Ofb7fY7cFaXUKKDr+1naVhy16EKHa55yCBCCAgdGno2LFUMw+aPe0HpJ4T1vqmHYU2lz7q9Wq8/3jbObn8+X/fm4NY/n6+3cx061FU5+NtPn265IX0oy8umDh3qqkKHMxkxnMlwqyz1MCxUwhLx1VkZZ1XxloZVqAgdzpq/Xl29w32sTx97P4ry6ofmmQ4daipDhw/njgNxVfPmuwvn/BOU51C+06FDXWXo8B7irC3EWT8WcRaUFz/thA7awRdbNBiEgiWBhYl468N3UP6ws0WjYYFlieXyT+fn3+KIfH9+/tst0Hu/Pv98e6Ytq6YCFnit+VzMgvN58VoGFRqWVC3OEgHomSyL1xpWJRk67B+dqb8407CkToClLavQPqwzDetuactSUOXgKz9/IFlXwypCh+OYNKy6tGUpSIcOCtIOXkE6dFCQtiwFaQevIB06KEhbloJ06KAg7eAVpEMHBWnLUpB28ArSoYOCtGUpSIcOCtIOXkE6dFCQtiwFqTh4feRI/9rv6dKwFKRhKUjDUpCGpSANS0GnwXrDBbDExZvn/tTPpNNg/U3o7/+QF6+U1mmwvhFqyvIbDeseWHvfg9TQsDSsP5KGpSANS0EaloI0LAVpWArSsBSkYSnoT4VF/uLr8KeBRaQYq/AQRm3bYJTUKwjVm9Hqcq+acbTNn6kngUWGsw5X38sEHEDlepNWa5ZPU8BBFrN2qYktn5zYnU57xPCSbdrtDSNRp1TbY3m71uhJqdyhJ4FFB5bPFcTWJkJbIWRkxb7j+IHVGjKD5qFfKGilJSzT960p0mKTMOwDrLKWb43hXtVoZj+DbT0VLNP0wzC2HDPsJTiAcrgTWrHlm4iD9K04DkzTDOLY6lWweo7pWFAfYPk+wnLgRsAFsDq1Ri376dkc6MlghV7iul3HN4MJ+C4PWFnjzB10YsDhUnjP7cZQCUq3aMZhmX7HIDVYfj9KuCKCdZf7jf5MPRmsuMsAUjTzTWvAEmQ1AOdO2SY0g5yi8x9CpSWr+3cOy4wXrA4rZzUHz6Bnq8tekoMXsNBXUSAS5GwJljbmnpukLce0IiLeipe01kwMQ6A7ZTuw9nq2utR4Hj0xLGLEpj9ji8C0MmEM/Hq4C4syFEFYwXjiO6Fb81lmqwcyO7To+cXCMljPcVokB0CJhOWFMCJpAYvx6pvFYrGJEBa4OrDFDu1XsBxUMGNFzy8XFg1NZ9eyxgBrSOuWxVYWKuGwRqwL90d5NRuGqPgVwKKZ8Fk4hwmfZc8OfBYdLMbj8SKSsNgiNoOeWc6GRspFip5fJCxwQpT0A/TXrgUGkuEkxkZAol/4/kOfBbBIClOoaR7OhsbLhbVMoyibQKDQBkRjDK+WSeQuAJuV7cGSkrAM6sZOBatvC8tKi55fICzT7PUcCNiDwIUIyW7HEEAFPYjAAZpwP3fCMtBtmdVsyNXrE+OlwoIJDNdwodVPeAiRbqwAZzU/jqcicAJYwG0XlunHfCENbssJxNpQ9AM9dSQs58XBCoQ5tMdDGWsTOty0gtCZeYkMMukwaPl7sFotk88DJO20euCsolapwrL8lv+yYBmGLURY9VyU2bjAq+1wQYXDZuKC4CUp++G6q9GfpyeCdXSHbv/O4QpvZyOw1k+t5TMtC7n0HryCNCwFPRss5cF0b4PDsfnFg5VQVK0bSt98xb/4tsRw9L9YU96Dv1vifcYMdP6kqFu1OnKjaFAkO2r35VMwgnNJPTdSVd/PgZyKiiWDbre7rA6GMnj967tf35a0mvOz5iErVVh0XEtHtNOoXWUdVjx2j5b9WWu2GdjUoMt2Z8Y/EfPgKiFsBdUjESbMOm2+V8GS1QQa5N2Ux2zZrDObltMsIcNFG6OUKjdSVI8YSdqdtthJoyPe/4msyDjGxf24YrWEl9fnn28LEs231z/Pj9BShAUhZZVo8NOkyjNYGEWxqW+J3MVsSJln+WJDApZEvuXC4tHy4xxtgE4tvAHjYRVjssMJLGfAeDTrV4EpTSZWgN2FVi5zIytLVo9XNnaHnRgkgYvxqREaNIO1gzUqhyFb4aJk+7nRrFg5F1eXhyNRFdZGZhYgXI/jNIHLIusAsACPY8KDWIEJmJgXm7GEFZocVgifEqHynXyENS4bONaK8XVSCYu6PtwGK4DlZNiKcO95I3MjIVQfUlgxBRjPsk0gdjtOEUlizortsfqtxmrrVN96+wWwCKYjpriTzDMLACvYlFkHfFTTyofucANWTo/DMnGtLWHxhaK1gAZ9vBjSOixiz4C5s8yyZeybIVDhj4W5keHYQrT4GhqRDHfJ2L2fuxJf3MKn22UV//5VxWoNrC7MI+PwAQ6e4Ydb8d0VhLVgpYdv+yY8BOYuBjkld8ByTMAqYNlgV1aXNxhZmPupw6JLuDVLMTeS4Ob+lOdG4gFuD7EE7RPWUI7fInQSOGXO7Y9hwT/1gV3F/eq/7BOsepdf7rM4L4Ql1nkcFq3d9ycyh485L4TlMpik67CgRZ8JWJjPCUTSghDMFbmsblkT3xQ7PoasWOVGDDENMnzwKbZZnmpYCOsIK7v8ImrwV8jqmH//cli4XwNy+pR2i513+UEAlt/PUbiFymHBattCtyVgFXv2sjIYTwWLpNC6LZLTxAYn1eOuqdjB5kctCOn4zqyNqYCTIweAdYQVkbCkXV0dZfUYsETWoU9xh9mq5n3+/KbPvT+6VAGrZ2OGIxOw0ODk00vSNVgR2Gm/8PUt+BE0L/0487xRJvevHWfnp/4hrO74CCsZwQvffherR4Alsg7W5KhlmTxfAZNdCcuAOcxpLUOENapZ1uqYZXUMOagDR1qWiCSZHwtAbAJd+22VkDQx9lhN8AaHJcfgXawew2cVWYcdn0UFrHCKs6YrHlNYFgLB7DTAApcD8wPvlHbQQ+34LLzjio38IVoZ8hQ/12AtR8AiWWyKjNLptIoLySrnQx1hNT8IVsd8+2PBKmdDe1bOhtmICQcvUhmlgwdY4nQEwqJpMb3xIMKf2WI2FB3SFU6QhMJVitNsl+dGAtFhAQsPA2CfCrD2WMlTUQCrmAfvsqtHgVVkHQhaioizFnfFWfzBWD/gsIgInLwkcsf8xASPs8ThENclaQ/Cq/YwioYt+DEdu5YbWfqFn2J932k9BJb4J4tzaWmwkP6wvt+uHsNn9eTeMMQAdAEf4N4InsMiEZ4SAVjEwONKcdgLQ74A4eMNjx3FsTUhNOOnmOAd3wx4vJ/K3EiIY6+C9RDLqvl2CWt/Hjyy7/AwWE4BK6yyDn3Gz7WFPHch1oaxU64NHQ4LQnH8dOCaHCfGxzfGskForcDbYabDkbMrWGDWwpUmdtdxRW4kL3IjVi4WzmCl/gNgFf6qcvb/5P7qY8mqeflIsMKWw/cYSNKrsg4YXYI1LFpBaE66NoUP5LR8CctsBQjLbIkhwzyzZfI1sGjgz8Yupz8Myu4wMki7HTMMev2pUeRGBnkP+m+Pin0I1u+11I8KFmOwbMiG8R6r+ecvX+5w7eQYSolpkOcuxM7abjVZyqeu8he7yY7dJAZhNE2SlFUbdZSlu7kR+wFpDsmqX9nV0Nq3q6uPjwRrJ8ewf8b4aAaClEmKg7d2d+7u6+74DfUsx6FdDQSry8qurrbfPxKsv7TIXXZ1VRuDVxfOcVg7egWwpF2RPbu6qtnVxYWpYRnFYY36PDg8HIMXeEPD4vtZEDkbu3YV/OvfFSsHWDnXbzUsDis+YDWLys0/bldHWb1KWNa+vwpmSbn5NzfvZPUqYW0O7YoWm3+C1fYoq1cIq9vft6tWQovNP8Hq/Dir1weLuPY+q7Tc/LvZ3mNXrxBWbfOvGIPl5t8N9+3ru1i9QliFKn+Fr3Dz7+biXrt6ACxxwMM4WJORYru8+rc7OM+228vzSrJqR+Xm302Pz4M3927+qcFKbYZ/iC0OZAtG8OyuneAKF/9yxU07ZURy5TVJkhakSXpqtv2ptGtXCGt+v796ACwynCw8+LNgm/HYNljepSmxgR7pJmMW2WQDIPvMjghJO+N+wgCpTVKS2oDOyyjeB2TpcKmSY3h8lXZVfAz2Hx9ZXZR2deyEliIsOpiyfDpl3cEmASNyPaBGx663icbRKIGiP+rbub0YDWi0YNEm22yycdoii27eH67c0XiReousO86f7VgyVzEPlvbNXM5qe1N8j1jz9qfyK8VKqcIadjbd4ZQNpptll7Kx1x8Ol6PM62eLiBcbNpxuBpuVxwCWvVmQxPNWXnfVzRJvmeXMG3jjbs6GzwqLTcUYLA9IsCz2TdO/+O/Xhf73/cevD6RsWUvCBrmXk5xREuWJm1MzW66AUjJaribZxOtHeZTDiEs7Xp4NxotsOLOdaJm53spdrDbDxXi58p7VsvZ8O7IykVWcMfnFh2/s38N2+aKUqoNHj2MnCYAi/AV4ocggSWRHdopFGqU0oilmE5LEpjQCrwBVKDot8GyJQROokaQnn3p5fB2xqwBZ+VmRTQd/G/rtI2dNVGdDIreEi0CBiDu8FL/sbBRzYDn3lZWK1s954p0e2pWDrEK3PA4ErEy/8wiw/uoiSS1uR0l/VbOrCFiVh5t29NpgGSQPd+2Kj0HHrcbgDI+7WMe+5fb1wYraVmVXNLPiIAhrYzCaWUEYW4Njx+NeHSwDpvOSFYkW/PeSS1YGGeGNVXT0KOHrgwXmVMtTMvF7ydWb/DU9PgG9RlgPloalIA1LQRqWgjQsBWlYCtKwFKRhKUjDUpCGpSANS0EaloI0LAVpWArSsBSkYSlIw1KQhqUgDUtBGpaCNCwFaVgK0rAUpGEpSMNSkIZ1uv4P2sGgK/HJeSUAAAAASUVORK5CYII=",
  //     },
  //   ]);
  const { notes, isLoading } = useSelector((state) => state.note);
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);
  // console.log(notes);

  useEffect(() => {
    const filteredBcaNotes = notes.filter(
      (item) => item.category.title === "BCA" && item.noteStatus === "accept"
    );
    const filteredBbaNotes = notes.filter(
      (item) => item.category.title === "BBA" && item.noteStatus === "accept"
    );
    const filteredBitNotes = notes.filter(
      (item) => item.category.title === "BIT" && item.noteStatus === "accept"
    );
    const filteredBbmNotes = notes.filter(
      (item) => item.category.title === "BBM" && item.noteStatus === "accept"
    );
    // console.log(filteredBbaNotes);
    setBcaNotes(filteredBcaNotes);
    setBbaNotes(filteredBbaNotes);
    setBbmNotes(filteredBbmNotes);
    setBitNotes(filteredBitNotes);
  }, [notes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending Notes in {year}</p>
                <h2>
                  Discover and share notes with a diverse community of learners
                  and educators on NoteSwap.{" "}
                </h2>
                <p>
                  Welcome to our notes sharing community, where knowledge meets
                  creativity! Share your notes with fellow learners, collaborate
                  on projects, and expand your horizons with a diverse community
                  of like-minded individuals. From science to literature, and
                  everything in between, let's embark on a journey of lifelong
                  learning together.
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="shop__btn">
                  <Link to="/note"> Go To Notes</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      {bbmNotes.length > 0 && (
        <section className="bit__notes ">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title mb-5">BBM Notes</h2>
              </Col>
              <NoteList data={bbmNotes} />
            </Row>
          </Container>
        </section>
      )}

      {bcaNotes.length > 0 && (
        <section className="bca__notes ">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title mb-5">BCA Notes</h2>
              </Col>
              <NoteList data={bcaNotes} />
            </Row>
          </Container>
        </section>
      )}
      {bcaNotes.length > 0 && (
        <section className="bca__notes ">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title mb-5">BCA Notes</h2>
              </Col>
              <NoteList data={bcaNotes} />
            </Row>
          </Container>
        </section>
      )}
    </Helmet>
  );
};

export default Home;

// <section className="trending__notes">
// <Container>
//   <Row>
//     <Col lg="12" className="text-center">
//       <h2 className="section__title">Trending Notes</h2>
//     </Col>
//     {/* <NoteList data={trendingNotes} /> */}
//   </Row>
// </Container>
// </section>
